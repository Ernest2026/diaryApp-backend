import app from "@/app";
import { StatusCodes } from "http-status-codes";
import supertest from "supertest";

const request = supertest(app);

describe("GET /", () => {
  it("should return a message", async () => {
    const response = await request.get("/")
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.text).toBe("Do you like indomie?");
  });
});
