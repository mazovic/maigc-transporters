import mongoose, { Document, Schema } from "mongoose";

export interface MagicItem extends Document {
    name: string;
    weight: number;
}

const MagicItemSchema = new Schema({
    name: { type: String, required: true, unique: true },
    weight: { type: Number, required: true }
});

const model = mongoose.model<MagicItem>("MagicItem", MagicItemSchema);

export default model;
