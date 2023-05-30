import { BaseEntity } from "./baseEntity";

export interface Role extends BaseEntity<number> {
    name: string;
}