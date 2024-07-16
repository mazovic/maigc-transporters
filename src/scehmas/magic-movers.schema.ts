import { z } from "zod";

const MagicMoverSchema = z.object({
    name: z.string(),
    weightLimit: z.number()
});

export type MagicMoverInput = z.infer<typeof MagicMoverSchema>;
export default {
    post: {
        create: MagicMoverSchema
    }
};
