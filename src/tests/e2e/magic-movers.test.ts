import "reflect-metadata";
import request from "supertest";
import express, { Application } from "express";
import { container } from "tsyringe";
import { MagicMoverController } from "../../controllers/magic-movers.controller";
import { MagicMoverService } from "../../services/magic-movers.service";
import model from "../../models/magic-mover.model";
import app from "../../app";

jest.mock("../../models/magic-mover.model");

describe("Magic Mover API", () => {
    let magicMoverService: MagicMoverService;

    beforeAll(() => {});

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new Magic Mover", async () => {
        const mockMover = {
            id: "1",
            name: "Test Magic Mover",
            weightLimit: 100,
            questState: "resting"
        };
        const saveMock = jest.fn().mockResolvedValue(mockMover);

        const MagicMoverModelMock = jest.fn().mockImplementation(() => ({
            save: saveMock
        }));
        (model as any).mockImplementation(MagicMoverModelMock);
        const payload = {
            name: "Test Magic Mover",
            weightLimit: 100,
            questState: "resting"
        };
        const response = await request(app)
            .post("/api/magic-movers/create")
            .send(payload)
            .expect(200);
        const after = { ...payload };
        expect(saveMock).toHaveBeenCalledTimes(1);
    });

    it("should return 400 for missing weightLimit", async () => {
        const saveMock = jest.fn().mockResolvedValue(null);
        const MagicMoverModelMock = jest.fn().mockImplementation(() => ({
            save: saveMock
        }));
        const payload = { name: "Test Magic Mover" };
        (model as any).mockImplementation(MagicMoverModelMock);
        await request(app)
            .post("/api/magic-movers/create")
            .send(payload)
            .expect(400);
        expect(MagicMoverModelMock).not.toHaveBeenCalledWith(payload);
        expect(saveMock).toHaveBeenCalledTimes(0);
    });
});
