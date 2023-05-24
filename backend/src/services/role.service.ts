import { ConnectDB } from "@/config/database";
import { CrudHelper } from "@/helpers/crud.helper";
import Role from "@/models/role";

export class RoleService extends CrudHelper<Role> {
    constructor() {
        super(ConnectDB.getRepository(Role));
    }
}