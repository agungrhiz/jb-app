import { UserService } from './user.service';
import User from '@/models/user';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async generateToken(user: User): Promise<string> {
        const secretKey = process.env.JWT_SECRET_KEY as Secret;

        const payload = {
            userId: user.id,
            role: user.fkRoleId == 1 ? 'ADMINISTRATOR' : 'USER',
        };

        const token = jwt.sign(payload, secretKey, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return token;
    }

    public async verifyCredentials(email: string, password: string): Promise<User | undefined> {
        const user = await this.userService.findByEmail(email);

        if (user && (await user.comparePassword(password))) {
            return user;
        }

        return undefined;
    }

    public async isAccountActive(user: User): Promise<boolean> {
        return user.isActive;
    }

    public async setPassword(token: string, password: string): Promise<void> {
        const user = await this.userService.findByVerificationToken(token);
        if (user) {
            user.password = password;
            user.verificationToken = '';
            user.emailVerified = true;
            user.isActive = true;

            await this.userService.save(user);
        } else {
            throw new Error('User not found');
        }
    }
}
