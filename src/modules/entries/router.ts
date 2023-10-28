import { prisma } from "@/utils/database";
import { Router } from "express";
import { z } from "zod";

export default Router()
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
    req.params.id
  })
