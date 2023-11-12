import app from '@/app'
import supertest from "supertest"

const request = supertest(app)

describe("GET /", () => {
    it("should return a message", async () => {
        const response = await request.get("http:localhost:8080/")
        expect(response.status).toBe(200)
        expect(response.text).toBe("Do you like indomie?");
    })
})