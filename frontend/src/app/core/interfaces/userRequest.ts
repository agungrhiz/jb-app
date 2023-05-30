import { BaseEntity } from "./baseEntity";
import { RequestStatus } from "./requestStatus";

export interface UserRequest extends BaseEntity<number> {
    fullName: string;
    nickName?: string;
    email: string;
    phoneNumber: string;
    instagram?: string;
    approvedBy?: number;
    status: RequestStatus;
}