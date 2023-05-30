import { ConnectDB } from "@/config/database";
import { CrudHelper } from "@/helpers/crud.helper";
import RequestStatus from "@/models/enum/requestStatus";
import Member from "@/models/member";
import User from "@/models/user";
import UserRequest from "@/models/useRequest";
import { EntityManager } from "typeorm";
import EmailService from "./smtp.service";
import * as dotenv from 'dotenv';

dotenv.config();

export class UserRequestService extends CrudHelper<UserRequest> {
    private emailService: EmailService;

    constructor() {
        super(ConnectDB.getRepository(UserRequest));
        this.emailService = new EmailService();
    }

    public async findByEmail(email: string): Promise<UserRequest | undefined> {
        const userRequest = await this.repository.findOneBy({ email: email });
        if (!userRequest) {
            return undefined;
        }

        return userRequest;
    }

    public async updateStatus(id: number, status: RequestStatus, approvedBy: number): Promise<UserRequest | undefined> {
        const userRequestToUpdate = await this.repository.findOneBy({ id: id });
        if (!userRequestToUpdate) {
            return undefined;
        }

        const updatedUserRequest = this.repository.merge(userRequestToUpdate, {
            status: status,
            approvedBy: approvedBy
        });
        const userRequest = await this.repository.save(updatedUserRequest);

        return userRequest;
    }

    public async approveRequest(userRequest: UserRequest, token: string): Promise<void> {
        const entityManager = ConnectDB.manager;
        await entityManager.transaction(async (transactionalEntityManager: EntityManager) => {
            const user = transactionalEntityManager.create(User, {
                email: userRequest.email,
                isActive: false,
                emailVerified: false,
                fkRoleId: 2,
                verificationToken: token
            });

            await transactionalEntityManager.save(user);

            const member = transactionalEntityManager.create(Member, {
                fkUserId: user.id,
                fullName: userRequest.fullName,
                nickName: userRequest.nickName,
                email: userRequest.email,
                phoneNumber: userRequest.phoneNumber,
                instagram: userRequest.instagram
            });

            await transactionalEntityManager.save(member);
        });
    }

    public async sendEmailVerification(data: UserRequest, token: string): Promise<void> {
        const fullName = data.fullName;
        const email = data.email;
        const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
        const subject = 'Email Verification';
        const content = `<p>Dear ${fullName},</p> 
            <p>Thank you for registering on our platform. Please verify your email address to activate your account.</p>
            <p>To complete the verification process, please click on the following link:</p>
            <p>Verification Link: <a href="${verificationLink}">confirm my accout</a></p>
            <p>Thank you,<br>The Team</p>`;

        await this.emailService.sendEmail(email, subject, content);
    }

    public async sendEmailRejection(data: UserRequest): Promise<void> {
        const fullName = data.fullName;
        const email = data.email;
        const subject = 'Registration Rejected';
        const content = `<p>Dear ${fullName},</p> 
            <p>We are sorry to inform you that your registration request has been rejected.</p>
            <p>Thank you,<br>The Team</p>`;

        await this.emailService.sendEmail(email, subject, content);
    }
}