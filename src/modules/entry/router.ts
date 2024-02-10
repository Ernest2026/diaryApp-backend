import { subject as an } from '@casl/ability'
import { APIError } from "@/utils/error";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { verify } from "@/middleware/jwt2";
import userPermissions from "@/utils/user-permissions";
import * as EntryService from "@/services/entry";

const router = Router()

router.post("/", verify(async (req, res, next, user) => {
  const payload = z.object({
    title: z.string({ required_error: "Please supply a title" }),
    emoji: z.string({ required_error: "Please supply an emoji" }).emoji("Invalid emoji"),
    text: z.string({ required_error: "Please supply some text" })
  }).parse(req.body)

  try {
    const entry = await EntryService.create(Object.assign(payload, {
      userId: user._id.toString(),
      updatedAt: new Date(),
    }))

    res.status(StatusCodes.CREATED).json({
      message: "Entry created!",
      data: entry
    })
  }
  catch (error) {
    res.locals.logger.debug("Error while creating entry:", error)
    throw new APIError("Failed to create an entry", { code: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}))

router.get("/", verify(async (req, res, next, user) => {
  const { limit, page } = z.object({
    limit: z.number().min(10).default(10),
    page: z.number().min(1).default(1)
  }).parse(req.query)

  const query = {
    take: limit,
    skip: (page - 1) * limit,
    where: {
      userId: user._id.toString()
    },
    orderBy: {
      createdAt: "desc"
    }
  }

  const entries = await EntryService.getByUserId({ limit, page, userId: user._id.toString() })

  entries.forEach(entry => {
    const userAbilities = userPermissions(user)
    if (!userAbilities.can('read', an("Entry", entry)))
      throw new APIError("You are not allowed to read this entry!", { code: StatusCodes.UNAUTHORIZED })
  })

  const count = await EntryService.countUserEntries({ userId: user._id.toString() })

  res.json({
    data: entries,
    meta: {
      page,
      perPage: limit,
      total: count
    }
  })
}))

router.get("/:id", verify(async (req, res, next, user) => {
  const entryId = req.params.id

  const entry = await EntryService.getById(entryId)

  if (!entry)
    throw new APIError("Entry not found!", { code: StatusCodes.NOT_FOUND })

  const userAbilities = userPermissions(user)
  if (!userAbilities.can('read', an("Entry", entry)))
    throw new APIError("You are not allowed to read this entry!", { code: StatusCodes.UNAUTHORIZED })

  res.json(entry)
}))

router.put("/:id", verify(async (req, res, next, user) => {
  const entryId = req.params.id;

  const payload = z.object({
    title: z.string(),
    emoji: z.string().emoji(),
    text: z.string()
  }).partial().parse(req.body);

  const entry = await EntryService.getById(entryId)

  if (!entry)
    throw new APIError("Entry not found!", { code: StatusCodes.NOT_FOUND })

  const userAbilities = userPermissions(user)
  if (!userAbilities.can('update', an("Entry", entry)))
    throw new APIError("You are not allowed to update this entry!", { code: StatusCodes.UNAUTHORIZED })

  await EntryService.updateById(entryId, payload)

  res.json({
    message: "Entry updated!"
  });
}))

router.delete("/:id", verify(async (req, res, next, user) => {
  const entryId = req.params.id;

  const entry = await EntryService.getById(entryId)

  if (!entry)
    throw new APIError("Entry not found!", { code: StatusCodes.NOT_FOUND })

  const userAbilities = userPermissions(user)
  if (!userAbilities.can('delete', an("Entry", entry)))
    throw new APIError("You are not allowed to delete this entry!", { code: StatusCodes.UNAUTHORIZED })

  await EntryService.deleteById(entryId)

  res.json({
    message: "Entry deleted!"
  });
}))

export default router
