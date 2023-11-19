// import { prisma } from "@/utils/database";
import { Router } from "express";
import EntryMiddleware from "../../middleware/entry";
import EntryController from "./controller";

const entryRouter = Router();
const { postEntry, getEntries, getEntryById, updateEntry, deleteEntry } =
  EntryController;
const { inspectEntry, inspectEntryPagination } = EntryMiddleware;

entryRouter.post("/", inspectEntry, postEntry);
entryRouter.get("/", inspectEntryPagination, getEntries);
entryRouter.get("/:id", getEntryById);
entryRouter.put("/:entryId", inspectEntry, updateEntry);
entryRouter.delete("/:entryId", deleteEntry);

export default entryRouter;
