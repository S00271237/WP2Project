import request from "supertest"
import {app} from "../../src/app"

describe("GET /users", () => {
    it("returns all users", async() => {
        const response = await request(app)
        .get("/api/v1/users")
        .set("x-api-key", "test")

        expect(response.status).toBe(200)
    });
});