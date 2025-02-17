import { client, logger } from "../setup";
import { StatusCodes } from "http-status-codes";
import DBConnection from "@/utils/database";
import { deleteGeneratedEntry, deleteGeneratedUser, generateRandomUser } from "../helpers";
import { EntryStatus, IUserDb } from "@/types/dbmodel";
import TokenService from "@/utils/token";

export const baseUrl = "/api/v1/entries";

let user: IUserDb;
let token: string;
let anotherUser: IUserDb;
let anotherUserToken: string;
let entryId: string;
let secondEntryId: string;

beforeAll(async () => {
  await DBConnection.mongoConnect();
  user = await generateRandomUser();
  token = await TokenService.generateAccessToken(user.email);

  anotherUser = await generateRandomUser();
  anotherUserToken = await TokenService.generateAccessToken(anotherUser.email);
});

afterAll(async () => {
  await deleteGeneratedUser(user.email);
  await deleteGeneratedUser(anotherUser.email);
  await deleteGeneratedEntry(secondEntryId);
  await DBConnection.mongoDisconnect();
});

describe("POST /", () => {
  test("that a new entries can be created by a user", async () => {
    const res = await client
      .post(`${baseUrl}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "My first entry",
        content: "This is my first entry",
        editorContent: "jsjsks",
        mood: "indifferent",
        status: "synced"
      });
    expect(res.status).toBe(StatusCodes.CREATED);
    entryId = res.body.data._id;
  });
});

describe("PUT /", () => {
  test("that are entries to be synced", async () => {
    secondEntryId = Date.now().toString()

    const res = await client
      .put(`${baseUrl}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        entries: [
          {
            _id: entryId,
            title: "My first edited entry",
            content: "This is my first entry",
            editorContent: "jsjsks",
            mood: "indifferent",
            status: "edited_after_sync"
          },
          {
            _id: secondEntryId,
            title: "My second entry",
            content: "This is my first entry",
            editorContent: "jsjsks",
            mood: "indifferent",
            status: "draft"
          },
        ]
      });
    expect(res.status).toBe(StatusCodes.CREATED);
  });
});

describe("GET /", () => {
  test("that a user can get all their entries", async () => {
    const res = await client
      .get(`${baseUrl}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body).toHaveProperty("meta");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.length).not.toBe(0);
  });
});

describe("GET /:id", () => {
  test("that a user can get one of their entries", async () => {
    const res = await client
      .get(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(StatusCodes.OK);
  });

  test("that a user cannot get another user's entry", async () => {
    const res = await client
      .get(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${anotherUserToken}`);
    expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
  });
});

describe("PUT /:id", () => {
  test("that a user can update one of their entries", async () => {
    const res = await client
      .put(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated my first entry",
        text: "This entry was updated",
      });
    expect(res.status).toBe(StatusCodes.OK);
  });

  test("that a user cannot update another user's entry", async () => {
    const res = await client
      .put(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${anotherUserToken}`)
      .send({
        title: "Updated my first entry",
        text: "This entry was updated",
      });
    expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
  });
});

describe("DELETE /:id", () => {
  test("that a user cannot delete another user's entry", async () => {
    const res = await client
      .delete(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${anotherUserToken}`);

    expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
  });

  test("that a user can delete one of their entries", async () => {
    const res = await client
      .delete(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(StatusCodes.OK);
  });

  test("that a user cannot access a deleted entry", async () => {
    const res = await client
      .get(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(StatusCodes.NOT_FOUND);
  });

  test("that a user cannot update a deleted entry", async () => {
    const res = await client
      .put(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated my first entry",
        text: "This entry was updated",
      });
    expect(res.status).toBe(StatusCodes.NOT_FOUND);
  });

  test("that a user cannot delete a deleted entry", async () => {
    const res = await client
      .delete(`${baseUrl}/${entryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(StatusCodes.NOT_FOUND);
  });
});
