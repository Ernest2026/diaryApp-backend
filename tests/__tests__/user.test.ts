import app from "@/app";
import DBConnection from "@/utils/database";
import TokenService from "@/utils/token";
import { StatusCodes } from "http-status-codes";
import path from "path";
import supertest from "supertest";
import { deleteGeneratedUser, generateRandomUser } from "../helpers";
import { chance } from "../setup";
import { IUserDb, UserType } from "@/types/dbmodel";

const request = supertest(app);

export const baseUrl = "/api/v1";

let user: IUserDb;
let accessToken: string;

beforeAll(async () => {
  await DBConnection.mongoConnect();
  user = await generateRandomUser();
  accessToken = await TokenService.generateAccessToken(user.email);
});

afterAll(async () => {
  await deleteGeneratedUser(user.email);
  await DBConnection.mongoDisconnect();
});

describe("PUT /user ", () => {
  test("a user can update field", async () => {
    const res = await request
      .put(`${baseUrl}/user`)
      .set("Authorization", `Bearer ${accessToken}`)
      .field("fullname", chance.name())
      .attach("image", path.resolve(__dirname, "./image/testimg.jpg"));
    expect(res.status).toBe(StatusCodes.CREATED);
    expect(res.body).toMatchObject({
      message: "User updated successfully",
    });
  });
});
