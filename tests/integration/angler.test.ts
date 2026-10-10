import request from "supertest"
import {app} from "../../src/app"

describe("GET /anglers", () => {
    it("returns all anglers", async() => {
        const response = await request(app)
        .get("/api/v1/anglers")
        .set("x-api-key", "test")

        expect(response.status).toBe(200)
    });
});