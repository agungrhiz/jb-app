import { Column, Entity } from "typeorm";
import { BaseEntity } from "./common/baseEntity";
import RequestStatus from "./enum/requestStatus";

@Entity({ name: "user_requests" })
export class UserRequest extends BaseEntity {
    @Column({ name: "full_name"})
    fullName!: string;

    @Column({ name:"nick_name", nullable: true })
    nickName?: string;

    @Column({ unique: true })
    email!: string;

    @Column({ name: "phone_number" })
    phoneNumber!: string;

    @Column({ nullable: true })
    instagram?: string;

    @Column({ name: "approved_by", nullable: true, default: null })
    approvedBy?: number;

    @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.Pending })
    status!: RequestStatus;
}

export default UserRequest;