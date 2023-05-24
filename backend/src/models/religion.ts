import { Column, Entity } from "typeorm";
import { BaseEntity } from "./common/baseEntity";

@Entity({ name: "religions" })
export class Religion extends BaseEntity {
    @Column()
    name!: string;
}

export default Religion;