import { verify } from "@/middleware/jwt";
import { Router } from "express";
import EntryController from './controller';
import EntryMiddleware from "./middleware";

const router = Router()

const {inspectCreateEntry, inspectGetEntry, inspectPutEntryById} = EntryMiddleware
const {createEntry, getEntry, getEntryById, putEntryById, deleteById} = EntryController

router.post("/", verify, inspectCreateEntry, createEntry)

router.get("/", verify, inspectGetEntry, getEntry)

router.get("/:id", verify, getEntryById)

router.put("/:id", verify, inspectPutEntryById, putEntryById)

router.delete("/:id", verify, deleteById)

export default router
