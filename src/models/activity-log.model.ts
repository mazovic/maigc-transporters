import mongoose, { Document, Schema } from "mongoose";

export interface ActivityLog extends Document {
    moverId: string;
    activity: "loading" | "on-mission" | "resting";
    timestamp: Date;
    details: string;
}

const ActivityLogSchema = new Schema({
    moverId: { type: String, required: true },
    activity: {
        type: String,
        enum: ["loading", "on-mission", "resting"],
        required: true
    },
    timestamp: { type: Date, default: Date.now },
    details: { type: String, required: true }
});

const ActivityLogModel = mongoose.model<ActivityLog>(
    "ActivityLog",
    ActivityLogSchema
);

export default ActivityLogModel;
