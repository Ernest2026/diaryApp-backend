import { prisma } from "@/utils/database";
import { APIError } from "@/utils/error";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import JWTMiddleware from "@/middleware/jwt";

export default Router()
  .post("/", JWTMiddleware.verify, async (req, res) => {
    const payload = z.object({
      title: z.string(),
      emoji: z.string().emoji(),
      text: z.string()
    }).parse(req.body)

    const entry = await prisma.entry.create({
      data: {
        ...payload,
        userId: res.locals.user!.id
      }
    })

    res.status(StatusCodes.CREATED).json({
      message: "Entry created!",
      data: entry
    })
  })
  .get("/", async (req, res) => {
    const { limit, page } = z.object({
      limit: z.number().min(10).default(10),
      page: z.number().min(1).default(1)
    }).parse(req.query)

    const query = {
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: "desc"
      }
    } as const

    const entries = await prisma.entry.findMany(query)
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
  })
  .get("/:id", async (req, res) => {
    const entryId = req.params.id

    const entry = await prisma.entry.findUnique({
      where: {
        id: entryId
      }
    })

    if (!entry)
      throw new APIError("Entry not found!", { code: StatusCodes.NOT_FOUND })

    res.json(entry)
  })
  .put("/:entryId", async (req, res) => {
    const entryId = req.params.entryId;

    const payload = z.object({
      title: z.string(),
      emoji: z.string().emoji(),
      text: z.string()
    }).parse(req.body);

    await prisma.entry.update({
      where: { id: entryId },
      data: payload
    });

    res.status(StatusCodes.OK).json({
      message: "Entry updated!"
    });
  })
  .delete("/:entryId", async (req, res) => {
    const entryId = req.params.entryId;

    await prisma.entry.delete({
      where: { id: entryId }
    });

    res.status(StatusCodes.OK).json({
      message: "Entry deleted!"
    });
  })
