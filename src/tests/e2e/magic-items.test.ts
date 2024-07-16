import "reflect-metadata";
import request from "supertest";
import model from "../../models/magic-mover.model";
import app from "../../app";

jest.mock("../../models/magic-mover.model");

describe("Magic Mover API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new Magic Item", async () => {
        const mockMover = {
            id: "1",
            name: "Test Magic Item",
            weight: 100
        };
        const saveMock = jest.fn().mockResolvedValue(mockMover);

        const MagicMoverModelMock = jest.fn().mockImplementation(() => ({
            save: saveMock
        }));
        (model as any).mockImplementation(MagicMoverModelMock);
        const payload = {
            name: "Test Magic Item",
            weight: 100
        };
        await request(app)
            .post("/api/magic-items/create")
            .send(payload)
            .expect(200);

        expect(saveMock).toHaveBeenCalledTimes(1);
    });

    it("should return 400 for missing weight", async () => {
        const saveMock = jest.fn().mockResolvedValue(null);
        const MagicMoverModelMock = jest.fn().mockImplementation(() => ({
            save: saveMock
        }));
        const payload = { name: "Test Magic Item" };
        (model as any).mockImplementation(MagicMoverModelMock);
        await request(app)
            .post("/api/magic-items/create")
            .send(payload)
            .expect(400);
        expect(MagicMoverModelMock).not.toHaveBeenCalledWith(payload);
        expect(saveMock).toHaveBeenCalledTimes(0);
    });
});
