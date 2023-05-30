import { BaseEntity } from "./baseEntity";

export interface Religion extends BaseEntity<number> {
    name: string;
}