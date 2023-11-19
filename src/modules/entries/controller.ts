import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import EntryService from "./service";
import { Request, Response } from "express";
import userPermissions from "@/utils/user-permissions";
import { APIError } from "@/utils/error";

class Entry {
  // constructor(parameters) {

  // }

  async postEntry(req: any, res: Response) {
    const entry = await EntryService.create({
      data: {
        ...req.body,
        userId: req.userEmail,
      },
    });

    res.status(StatusCodes.CREATED).json({
      message: "Entry created!",
      data: entry,
    });
  }

  async getEntries(req: any, res: Response) {
    // const query = {
    //   take: limit,
    //   skip: (page - 1) * limit,
    //   where: {
    //     userId: user.id,
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // } as const;
    const entries = await EntryService.find({userId: req.userEmail});

    // entries.forEach((entry) => {
    //   const userAbilities = userPermissions(user);
    //   if (!userAbilities.can("read", an("Entry", entry)))
    //     throw new APIError("You are not allowed to read this entry!", {
    //       code: StatusCodes.UNAUTHORIZED,
    //     });
    // });

    // const { _count: count } = await prisma.entry.aggregate({
    //   ...query,
    //   _count: true,
    // });

    res.json({
      data: entries,
      // meta: {
      //   page,
      //   perPage: limit,
      //   total: count,
      // },
    });
  }

  async getEntryById(req: Request, res: Response) {
      const entry = await EntryService.findById(req.params.id)

      if (!entry)
        throw new APIError("No entry found!", { code: StatusCodes.NOT_FOUND });

      // const userAbilities = userPermissions(user);
      // if (!userAbilities.can("read", an("Entry", entry)))
      //   throw new APIError("You are not allowed to read this entry!", {
      //     code: StatusCodes.UNAUTHORIZED,
      //   });

      res.json(entry);
  }

  async updateEntry(req: Request, res: Response) {
      const entry = await EntryService.findById(req.params.entryId);

      if (!entry)
        throw new APIError("Entry not found!", { code: StatusCodes.NOT_FOUND });

      // const userAbilities = userPermissions(user);
      // if (!userAbilities.can("update", an("Entry", entry)))
      //   throw new APIError("You are not allowed to update this entry!", {
      //     code: StatusCodes.UNAUTHORIZED,
      //   });

      await EntryService.update(
        { id: req.params.entryId, userId: req.body.userId },
        { data: req.body },
      );

      res.json({
        message: "Entry updated!",
      });
  }

  async deleteEntry(req: Request, res: Response) {
      const entry = await EntryService.findById(req.params.entryId);

      if (!entry)
        throw new APIError("No entry found!", { code: StatusCodes.NOT_FOUND });

      // const userAbilities = userPermissions(user);
      // if (!userAbilities.can("delete", an("Entry", entry)))
      //   throw new APIError("You are not allowed to delete this entry!", {
      //     code: StatusCodes.UNAUTHORIZED,
      //   });

      await EntryService.delete({ id: req.params.entryId, userId: req.body.userId });

      res.json({
        message: "Entry deleted!",
      });
  }
}

export default new Entry();
