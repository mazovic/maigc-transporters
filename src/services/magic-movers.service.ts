import { container, injectable, inject } from "tsyringe";
import { MagicMoverInput } from "../scehmas/magic-movers.schema";
import { Model } from "mongoose";
import model from "../models/magic-mover.model";

container.register("MagicMoverModel", { useValue: model });
@injectable()
export class MagicMoverService {
    constructor(
        @inject("MagicMoverModel") private MagicMoverModel: typeof model
    ) {}
    async create(payload: MagicMoverInput) {
        const magicMover = new this.MagicMoverModel({ ...payload });
        await magicMover.save();
        return magicMover;
    }
}
