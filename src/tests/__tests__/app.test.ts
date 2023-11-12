import app from "@/app";
import { StatusCodes } from "http-status-codes";
import supertest from "supertest";

const request = supertest(app);

describe("GET /", () => {
  it("should return a message", async () => {
    const response = await request.get("");
    // console.log(response);
    
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.text).toBe("Do you like indomie?");
  //   request
  // .get('/')
  // .expect('Type', /json/)
  // .expect('Content-Length', '15')
  // .expect(200)
  // .end(function(err, res) {
  //   if (err) throw err;
  // });
  });
});
