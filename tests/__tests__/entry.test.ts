import { client, logger } from "../setup"
import { StatusCodes } from "http-status-codes";
import DBConnection from "@/utils/database";
import { generateRandomUser } from "../helpers";
import { IUserDb } from "@/types/dbmodel";
import TokenService from "@/services/token";

export const baseUrl = "/api/v1/entries";

describe("Entry tests", () => {
  let user: IUserDb;
  let token: string
  let anotherUser: IUserDb;
  let anotherUserToken: string
  let entryId: string

  beforeAll(async () => {
    await DBConnection.mongoConnect();
    user = await generateRandomUser()
    token = await TokenService.generateAccessToken(user.email)

    anotherUser = await generateRandomUser()
    anotherUserToken = await TokenService.generateAccessToken(anotherUser.email)
  })

  afterAll(async () => {
    await DBConnection.mongoDisconnect();
  })

  test("that a new entry can be created by a user", async () => {
    const res = await client
      .post(`${baseUrl}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "My first entry",
        text: "This is my first entry",
        emoji: "👨",
      });
    entryId = res.body.data._id
    expect(res.status).toBe(StatusCodes.CREATED)
  });

  test("that a user can get all their entries", async () => {
    const res = await client
      .get(`${baseUrl}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body).toHaveProperty("meta")
    expect(res.body).toHaveProperty("data")
    expect(res.body.data.length).not.toBe(0)
  })

  test("that a user can get one of their entries", async () => {
    const res = await client
      .get(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(StatusCodes.OK)
  })

  test("that a user can update one of their entries", async () => {
    const res = await client
      .put(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated my first entry",
        text: "This entry was updated",
      });
    expect(res.status).toBe(StatusCodes.OK)
  })

  test("that a user cannot get another user's entry", async () => {
    const res = await client
      .get(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${anotherUserToken}`);
    expect(res.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test("that a user cannot update another user's entry", async () => {
    const res = await client
      .put(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${anotherUserToken}`)
      .send({
        title: "Updated my first entry",
        text: "This entry was updated",
      });
    expect(res.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test("that a user cannot delete another user's entry", async () => {
    const res = await client
      .delete(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${anotherUserToken}`)

    expect(res.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test("that a user can delete one of their entries", async () => {
    const res = await client
      .delete(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(StatusCodes.OK)
  })

  test("that a user cannot access a deleted entry", async () => {
    const res = await client
      .get(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(StatusCodes.NOT_FOUND)
  })

  test("that a user cannot update a deleted entry", async () => {
    const res = await client
      .put(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated my first entry",
        text: "This entry was updated",
      });
    expect(res.status).toBe(StatusCodes.NOT_FOUND)
  })

  test("that a user cannot delete a deleted entry", async () => {
    const res = await client
      .delete(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(StatusCodes.NOT_FOUND)
  })
});
