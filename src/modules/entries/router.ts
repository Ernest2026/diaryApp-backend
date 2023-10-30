import { subject as an } from '@casl/ability'
import { prisma } from "@/utils/database";
import { APIError } from "@/utils/error";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { verify } from "@/utils/jwt";
import userPermissions from "@/utils/user-permissions";

export default Router()
  .post("/", verify(async (req, res, next, user) => {
    const payload = z.object({
      title: z.string(),
      emoji: z.string().emoji(),
      text: z.string()
    }).parse(req.body)

    const entry = await prisma.entry.create({
      data: {
        ...payload,
        userId: user.id
      }
    })

    res.status(StatusCodes.CREATED).json({
      message: "Entry created!",
      data: entry
    })
  }))
  .get("/", verify(async (req, res, next, user) => {
    const { limit, page } = z.object({
      limit: z.number().min(10).default(10),
      page: z.number().min(1).default(1)
    }).parse(req.query)

    const query = {
      take: limit,
      skip: (page - 1) * limit,
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    } as const

    const entries = await prisma.entry.findMany(query)

    entries.forEach(entry => {
      const userAbilities = userPermissions(user)
      if (!userAbilities.can('read', an("Entry", entry)))
        throw new APIError("You are not allowed to read this entry!", { code: StatusCodes.UNAUTHORIZED })
    })

    const { _count: count } = await prisma.entry.aggregate({
      ...query,
      _count: true
    })

    res.json({
      data: entries,
      meta: {
        page,
        perPage: limit,
        total: count
      }
    })
  }))
  .get("/:id", verify(async (req, res, next, user) => {
    const entryId = req.params.id

    const entry = await prisma.entry.findUnique({
      where: {
        id: entryId
      }
    })

    if (!entry)
      throw new APIError("Entry not found!", { code: StatusCodes.NOT_FOUND })

    const userAbilities = userPermissions(user)
    if (!userAbilities.can('read', an("Entry", entry)))
      throw new APIError("You are not allowed to read this entry!", { code: StatusCodes.UNAUTHORIZED })

    res.json(entry)
  }))
  .put("/:entryId", verify(async (req, res, next, user) => {
    const entryId = req.params.entryId;

    const payload = z.object({
      title: z.string(),
      emoji: z.string().emoji(),
      text: z.string()
    }).parse(req.body);

    const entry = await prisma.entry.findUnique({
      where: { id: entryId }
    })

    if (!entry)
      throw new APIError("Entry not found!", { code: StatusCodes.NOT_FOUND })

    const userAbilities = userPermissions(user)
    if (!userAbilities.can('update', an("Entry", entry)))
      throw new APIError("You are not allowed to update this entry!", { code: StatusCodes.UNAUTHORIZED })

    await prisma.entry.update({
      where: { id: entryId, userId: user.id },
      data: payload
    });

    res.json({
      message: "Entry updated!"
    });
  }))
  .delete("/:entryId", verify(async (req, res, next, user) => {
    const entryId = req.params.entryId;

    const entry = await prisma.entry.findUnique({
      where: { id: entryId }
    })

    if (!entry)
      throw new APIError("Entry not found!", { code: StatusCodes.NOT_FOUND })

    const userAbilities = userPermissions(user)
    if (!userAbilities.can('delete', an("Entry", entry)))
      throw new APIError("You are not allowed to delete this entry!", { code: StatusCodes.UNAUTHORIZED })

    await prisma.entry.delete({
      where: { id: entryId, userId: user.id }
    });

    res.json({
      message: "Entry deleted!"
    });
  }))
