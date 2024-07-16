import { z } from "zod";

const MagitcItemSchema = z.object({
    name: z.string(),
    weight: z.number()
});

export type MagitcItemInput = z.infer<typeof MagitcItemSchema>;
export default {
    post: {
        create: MagitcItemSchema
    }
};
