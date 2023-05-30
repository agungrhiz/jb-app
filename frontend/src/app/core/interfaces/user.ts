import { BaseEntity } from "./baseEntity";
import { Role } from "./role";

export interface User extends BaseEntity<number> {
    email: string;
    password?: string;
    emailVerified: boolean;
    verificationToken?: string;
    isActive: boolean;
    fkRoleId: number;
    role: Role;
}
