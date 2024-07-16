import request from "supertest";
import "reflect-metadata";

import app from "../../app";

describe("Samples Tests", () => {
    it("should return 404 and the correct error message", async () => {
        const response = await request(app).get("/api/test123");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            error: "/api/test123 not found",
            success: false
        });
    });
    it("should return 200 and the correct response", async () => {
        const response = await request(app).get("/api/test");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: { ok: "true" }, success: true });
    });
});
