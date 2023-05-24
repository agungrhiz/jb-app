import { ConnectDB } from "@/config/database";
import { CrudHelper } from "@/helpers/crud.helper";
import User from "@/models/user";

export class UserService extends CrudHelper<User> {
    constructor() {
        super(ConnectDB.getRepository(User));
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return await this.repository.findOneByOrFail({ email: email });
    }

    public async findByVerificationToken(token: string): Promise<User | undefined> {
        return await this.repository.findOneByOrFail({ verificationToken: token });
    }

    public async save(user: User): Promise<User> {
        return await this.repository.save(user);
    }
}