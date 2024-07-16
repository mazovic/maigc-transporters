import mongoose, { Document, Schema } from "mongoose";

export interface MagicMover extends Document {
    name: string;
    weightLimit: number;
    questState: "resting" | "loading" | "on-mission";
}

const MagicMoverSchema = new Schema({
    name: { type: String, required: true },
    weightLimit: { type: Number, required: true },
    questState: {
        type: String,
        enum: ["resting", "loading", "on-mission"],
        default: "resting"
    }
});

const model = mongoose.model<MagicMover>("MagicMover", MagicMoverSchema);

export default model;
