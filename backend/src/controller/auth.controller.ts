import { AuthService } from '@/services/auth.service';
import { Request, Response } from 'express';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            const verify = await this.authService.verifyCredentials(email, password);
            if (!verify) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            const isActive = await this.authService.isAccountActive(verify);
            if (!isActive) {
                res.status(401).json({ error: 'Account is not active' });
                return;
            }

            const token = await this.authService.generateToken(verify);

            res.status(200).json({ token: token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    public verifyToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const { token, password } = req.body;

            await this.authService.setPassword(token, password);

            res.status(200).json({ message: 'Password set successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
