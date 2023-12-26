import supertest from "supertest";
import app from "@/app";
import { Chance } from "chance";
import GlobalLogger from "@/utils/logger";

export const client = supertest(app);
export const chance = new Chance()
export const logger = GlobalLogger.getSubLogger({ name: 'TestsLogger' })
