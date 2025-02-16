import { subject as an } from '@casl/ability'
import EntryService from "@/modules/entry/service";
import { APIError } from "@/utils/error";
import UserPermissions from "@/utils/user-permissions";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class Entry {
  // constructor(parameters) {

  // }

  async createEntry(req: Request, res: Response) {
    try {
      const { title, emoji, text } = req.body;
      const entry = await EntryService.create({
        userId: res.locals.user._id.toString(),
        updatedAt: new Date(),
        title,
        emoji,
        text,
      });

      res.status(StatusCodes.CREATED).json({
        message: "Entry created!",
        data: entry,
      });
    } catch (error) {
      res.locals.logger.debug("Error while creating entry:", error);
      throw new APIError("Failed to create an entry", {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getEntry(req:Request, res:Response) {
    const {limit, page} = req.query;
    const query = {
      take: limit,
      // skip: (page - 1) * limit,
      where: {
        userId: res.locals.user._id.toString()
      },
      orderBy: {
        createdAt: "desc"
      }
    }
  
    const entries = await EntryService.getEntryByUserId({ userId: res.locals.user._id.toString() })
    // const entries = await EntryService.getEntryByUserId({ limit, page, userId: res.locals.user._id.toString() })
  
    entries.forEach(entry => {
      const userAbilities = UserPermissions(res.locals.user)
      if (!userAbilities.can('read', an("Entry", entry)))
        throw new APIError("You are not allowed to read this entry!", { code: StatusCodes.UNAUTHORIZED })
    })
  
    const count = await EntryService.countUserEntriesById({ userId: res.locals.user._id.toString() })
  
    res.json({
      data: entries,
      meta: {
        page,
        perPage: limit,
        total: count
      }
    })
  }

  async getEntryById(req: Request, res: Response) {
    const entry = await EntryService.getEntryById(req.params.id)
  
    if (!entry)
      throw new APIError("Entry not found!", { code: StatusCodes.NOT_FOUND })
  
    const userAbilities = UserPermissions(res.locals.user)
    if (!userAbilities.can('read', an("Entry", entry)))
      throw new APIError("You are not allowed to read this entry!", { code: StatusCodes.UNAUTHORIZED })
  
    res.json(entry)
  }

  async putEntryById(req: Request, res: Response) {
    const entryId = req.params.id;

    const entry = await EntryService.getEntryById(entryId)
  
    if (!entry)
      throw new APIError("Entry not found!", { code: StatusCodes.NOT_FOUND })
  
    const userAbilities = UserPermissions(res.locals.user)
    if (!userAbilities.can('update', an("Entry", entry)))
      throw new APIError("You are not allowed to update this entry!", { code: StatusCodes.UNAUTHORIZED })
  
    await EntryService.updateEntryById(entryId, req.query)
  
    res.json({
      message: "Entry updated!"
    });
  }

  async deleteEntryById(req: Request, res: Response) {
    const entryId = req.params.id;
  
    const entry = await EntryService.getEntryById(entryId)
  
    if (!entry)
      throw new APIError("Entry not found!", { code: StatusCodes.NOT_FOUND })
  
    const userAbilities = UserPermissions(res.locals.user)
    if (!userAbilities.can('delete', an("Entry", entry)))
      throw new APIError("You are not allowed to delete this entry!", { code: StatusCodes.UNAUTHORIZED })
  
    await EntryService.deleteEntryById(entryId)
  
    res.json({
      message: "Entry deleted!"
    });
  }
}

export default new Entry();
