import { container, injectable, inject } from "tsyringe";
import { MagicMoverInput } from "../scehmas/magic-movers.schema";
import MagicMoverModelM from "../models/magic-mover.model";
import ActivityLogModelM from "../models/activity-log.model";
import { MagitcItemInput } from "../scehmas/magic-items.schema";
import MagicItemModelM from "../models/magic-items.model";
import { Types } from "mongoose";
import { AppError } from "../lib/AppError";

@injectable()
export class MagicMoverService {
    constructor(
        @inject("MagicMoverModel")
        private MagicMoverModel: typeof MagicMoverModelM,
        @inject("ActivityLogModel")
        private ActivityLogModel: typeof ActivityLogModelM,
        @inject("MagicItemModel") private MagicItemModel: typeof MagicItemModelM
    ) {}
    async create(payload: MagicMoverInput) {
        const magicMover = new this.MagicMoverModel({ ...payload });
        await magicMover.save();
        return magicMover;
    }
    async loadItems(id: string, names: string[]) {
        let mover = null;
        try {
            mover = await this.MagicMoverModel.findById(id);
        } catch (err) {
            throw new AppError("malformed id");
        }
        if (!mover) {
            throw new AppError("Magic Mover not found");
        }
        if (mover.questState === "on-mission") {
            throw new AppError("Magic Mover is on mission");
        }
        const items = await this.MagicItemModel.find({
            $or: [{ _id: { $in: mover.items } }, { name: { $in: names } }]
        });

        const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
        if (totalWeight > mover.weightLimit) {
            throw new AppError("Weight limit exceeded");
        }
        const nonExistingItems = items.filter(
            e => !mover.items.includes(e._id as Types.ObjectId)
        );
        mover.items.push(...nonExistingItems.map(e => e._id as Types.ObjectId));
        mover.questState = "loading";
        await mover.save();

        if (nonExistingItems.length > 0) {
            const log = new this.ActivityLogModel({
                moverId: id,
                activity: "loading",
                details: `Loaded items: ${nonExistingItems
                    .map(item => item.name)
                    .join(", ")}`
            });
            await log.save();
        }
        return mover;
    }
    async startMission(id: string) {
        const mover = await this.MagicMoverModel.findById(id);
        if (!mover) {
            throw new AppError("Magic Mover not found");
        }
        if (mover.questState !== "loading") {
            throw new AppError("Magic Mover is not in loading state");
        }

        mover.questState = "on-mission";
        await mover.save();

        const log = new this.ActivityLogModel({
            moverId: id,
            activity: "on-mission",
            details: "Mission started"
        });
        await log.save();

        return mover;
    }
    async endMission(id: string) {
        const mover = await this.MagicMoverModel.findById(id);
        if (!mover) {
            throw new AppError("Magic Mover not found");
        }
        if (mover.questState !== "on-mission") {
            throw new AppError("Magic Mover is not on a mission");
        }

        mover.items = [];
        mover.questState = "resting";
        await mover.save();

        const log = new this.ActivityLogModel({
            moverId: id,
            activity: "finished",
            details: "Mission ended and items unloaded"
        });
        await log.save();

        return mover;
    }
    async getTopMovers() {
        const result = await this.ActivityLogModel.aggregate([
            {
                $match: {
                    activity: "finished"
                }
            },
            {
                $group: {
                    _id: "$moverId",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $addFields: {
                    _id: {
                        $toObjectId: "$_id"
                    }
                }
            },
            {
                $lookup: {
                    from: "magicmovers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "mover"
                }
            },
            {
                $unwind: "$mover"
            },
            {
                $project: {
                    mover: {
                        name: 1
                    },
                    count: 1
                }
            }
        ]);

        return result.map(entry => ({
            mover: entry.mover,
            missionCount: entry.count
        }));
    }
}
