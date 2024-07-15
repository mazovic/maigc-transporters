import { injectable } from "tsyringe";

@injectable()
export class TestService {
    get() {
        return { ok: "true" };
    }
}
