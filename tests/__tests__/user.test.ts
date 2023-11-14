import app from "@/app";
import DBConnection from "@/utils/database";
import TokenService from "@/utils/token";
import { StatusCodes } from "http-status-codes";
import path from "path";
import supertest from "supertest";
import { generateUser } from "../utils";

const request = supertest(app);

export const baseUrl = "/api/v1";

let user;
let accessToken: string;

beforeAll(async () => {
  await DBConnection.mongoConnect();
  user = await generateUser();
  accessToken = await TokenService.generateAccessToken(user.email);
});

afterAll(async () => {
  await DBConnection.mongoDisconnect();
});

describe("PUT /user ", () => {
  test("a user can update field", async () => {
    const res = await request
      .put(`${baseUrl}/user`)
      .set("Authorization", `Bearer ${accessToken}`)
      .attach("image", path.resolve(__dirname, "./image/testimg.jpg"));
    expect(res.status).toBe(StatusCodes.CREATED);
    expect(res.body).toMatchObject({
      message: "User updated successfully",
    });
  });
});
