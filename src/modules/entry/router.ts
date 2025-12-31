import { verify } from "../../middleware/jwt";
import { Router } from "express";
import EntryController from './controller';
import EntryMiddleware from "./middleware";

const router = Router()

const {inspectCreateEntries, inspectCreateEntry, inspectGetEntry, inspectPutEntryById} = EntryMiddleware
const {createEntries, createEntry, getEntries, getEntryById, putEntryById, deleteEntryById} = EntryController

router.post("/", verify, inspectCreateEntry, createEntry)

router.get("/", verify, inspectGetEntry, getEntries)

router.get("/:id", verify, getEntryById)

router.put("/:id", verify, inspectPutEntryById, putEntryById)

router.put("/", verify, inspectCreateEntries, createEntries)

router.delete("/:id", verify, deleteEntryById)

export default router
