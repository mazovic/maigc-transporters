import { container, injectable, inject } from "tsyringe";
import model from "../models/magic-items.model";
import { MagitcItemInput } from "../scehmas/magic-items.schema";

@injectable()
export class MagicItemService {
    constructor(
        @inject("MagicItemModel") private MagicItemModel: typeof model
    ) {}
    async create(payload: MagitcItemInput) {
        const magicItem = new this.MagicItemModel({ ...payload });
        await magicItem.save();
        return magicItem;
    }
}
