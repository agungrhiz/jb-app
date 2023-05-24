import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./common/baseEntity";
import Gender from "./enum/gender";
import Religion from "./religion";
import Upload from "./upload";
import User from "./user";

@Entity({ name: "members" })
export class Member extends BaseEntity {
    @Column({ nullable: true, unique: true })
    nik?: string;

    @Column({ name: "full_name"})
    fullName!: string;

    @Column({ name:"nick_name", nullable: true })
    nickName?: string;

    @Column({ unique: true })
    email!: string;

    @Column({ name: "phone_number" })
    phoneNumber!: string;

    @Column({ nullable: true })
    address?: string;

    @Column({ name: "place_of_birth", nullable: true })
    placeOfBirth?: string;

    @Column({ name: "date_of_birth", nullable: true })
    dateOfBirth?: Date;

    @Column({ nullable: true })
    gender?: Gender;

    @Column({ name: "fk_religion_id", nullable: true })
    fkReligionId?: number;

    @Column({ name: "registration_date", nullable: true })
    regisrationDate?: Date;

    @Column({ nullable: true })
    youtube?: string;

    @Column({ nullable: true })
    facebook?: string;
    
    @Column({ nullable: true })
    instagram?: string;

    @Column({ nullable: true })
    twitter?: string;

    @Column({ name: "fk_photo_id", nullable: true})
    fkPhotoId?: number;

    @Column({ name: "fk_user_id" })
    fkUserId!: number;

    // Relationship with another model
    @ManyToOne(() => Religion)
    @JoinColumn({ name: 'fk_religion_id' })
    religion?: Religion;

    @OneToOne(() => User)
    @JoinColumn({ name: 'fk_user_id' })
    user!: User;

    @OneToOne(() => Upload)
    @JoinColumn({ name: 'fk_photo_id' })
    photo?: Upload;
}

export default Member;