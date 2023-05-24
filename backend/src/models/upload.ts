import { Column, Entity } from "typeorm";
import { BaseEntity } from "./common/baseEntity";
import UploadType from "./enum/uploadType";

@Entity({ name: "uploads" })
export class Upload extends BaseEntity {
    @Column()
    url!: string;

    @Column({ name: "thumbnail_url", nullable: true })
    thumbnailUrl?: string;

    @Column()
    name!: string;

    @Column()
    size!: number;

    @Column()
    type!: UploadType;

    @Column({ name: "fk_user_id" })
    fkUserId!: number;
}

export default Upload;