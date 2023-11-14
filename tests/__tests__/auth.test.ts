import supertest from "supertest";
import app from "@/app";
import { Chance } from "chance";
import { StatusCodes } from "http-status-codes";
import DBConnection from "@/utils/database";

const request = supertest(app);
const chance = new Chance()

const user = {
  fullname: chance.name(),
  email: chance.email(),
  password: chance.string({ length: 10 }),
};

export const baseUrl = "/api/v1/auth";

beforeAll(async () => {
  await DBConnection.mongoConnect();
})

afterAll(async () => {
  await DBConnection.mongoDisconnect();
})

describe("POST /signup ", () => {
  test("a new user can signup", async () => {
    const res = await request.post(`${baseUrl}/signup`).send(user);
    expect(res.status).toBe(StatusCodes.CREATED)
    expect(res.body).toMatchObject({
      message: "User created successfully",
    });
  });
  
  test("should return an error since user already exists", async () => {
    const res = await request.post(`${baseUrl}/signup`).send(user);
    expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.body).toMatchObject({
      error: "Email already exist",
    });
  });
});

describe("POST /login ", () => {
  test("a new user can signup", async () => {
    const res = await request.post(`${baseUrl}/login`).send(user);
    expect(res.status).toBe(StatusCodes.CREATED)
    expect(res.body).toMatchObject({
      message: "Login successfully",
    });
  });
  
  test("should return an error when wrong email is inputed", async () => {
    const res = await request.post(`${baseUrl}/login`).send({...user, email: "wrongemail@example.com"});
    expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.body).toMatchObject({
      error: "Email doesn't exist",
    });
  });
  
  test("should return an error when wrong password is inputed", async () => {
    const res = await request.post(`${baseUrl}/login`).send({...user, password: "wrongpassword"});
    expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.body).toMatchObject({
      error: "Wrong password",
    });
  });
});