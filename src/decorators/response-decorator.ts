import { Request, Response, NextFunction } from "express";

export function ResponseHandler() {
    return function(
        target: any,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<any>
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function(
            req: Request,
            res: Response,
            next: NextFunction
        ) {
            try {
                const result = await originalMethod.apply(this, [
                    req,
                    res,
                    next
                ]);
                res.json({ data: result, success: true });
            } catch (error) {
                next(error);
            }
        };

        return descriptor;
    };
}
