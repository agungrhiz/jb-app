import { BaseEntity } from "./common/baseEntity";
import { Column, Entity } from "typeorm";

@Entity({ name: "roles" })
export class Role extends BaseEntity {
    @Column()
    name!: string;
}

export default Role;