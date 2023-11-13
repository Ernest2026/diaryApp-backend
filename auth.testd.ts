// import supertest from "supertest";
// import app from "../app";
// // import { MemoryServerClient } from "../../connection/mongoConnect";
// import { config } from "dotenv";
// // import { send } from 'process'
// // import { User } from "../model/userModel";

// config();

// const request = supertest(app);
// // const mem_server = new MemoryServerClient();

// beforeAll(() => {
//   mem_server.connectDb();
// });

// afterAll(async () => {
//   mem_server.stopDb();
// });

// let token: string = "";
// let emailToken: string = "";
// const id = "";

// const regUser = {
//   firstName: "Foluso",
//   lastName: "Kayode",
//   email: "foluso2004ng@gmail.com",
//   phoneNumber: "08076518356",
//   password: "12345",
// };

// const loginUser = {
//   email: "foluso2004ng@gmail.com",
//   password: "12345",
// };

// const otherUser = [
//   {
//     firstName: "Seun",
//     lastName: "Kayode",
//     email: "folusolibrary@gmail.com",
//     phoneNumber: "08076518357",
//     password: "12345",
//   },
//   {
//     firstName: "Ben",
//     lastName: "Kayode",
//     email: "benkayode@gmail.com",
//     phoneNumber: "08076518377",
//     password: "12345",
//   },
// ];

// describe("POST /signup ", () => {
//   test("a new user can signup", async () => {
//     const res = await request.post("/signup").send(regUser);
//     emailToken = res.body.emailToken;
//     expect(res.status).toBe(200);
//     expect(res.body).toMatchObject({
//       message: "Verification email has been sent to your email account",
//     });
//   });
// });

// describe("GET /newuser/verify-email ", () => {
//   test("if a registered user is verified", async () => {
//     const res = await request.get(`/newuser/verify-email?token=${emailToken}`);
//     token = res.body.accessToken;
//     expect(res.status).toBe(200);
//     expect(res.body).toMatchObject({
//       Message: "You have been successfully verified",
//     });
//   });
// });

// describe("POST /login", () => {
//   test("if a registered user is verified", async () => {
//     const res = await request.post("/login").send(loginUser);
//     token = res.body.accessToken;
//     expect(res.status).toBe(200);
//   });
// });
