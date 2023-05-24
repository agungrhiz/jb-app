import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: JwtPayload;
}

export function rbacMiddleware(roles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            // Get the JWT token from the Authorization header
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            // Verify the JWT token
            const secretKey = process.env.JWT_SECRET_KEY as Secret;
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    console.error('Error verifying JWT token:', err);
                    return res.status(401).json({ error: 'Unauthorized' });
                }

                // Attach the decoded token payload to the request object
                req.user = decoded as JwtPayload;

                // Check if the user's role is included in the allowed roles
                const userRole = req.user?.role;
                if (userRole && roles.includes(userRole)) {
                    next();
                } else {
                    res.status(403).json({ error: 'Forbidden' });
                }
            });
        } catch (error) {
            console.error('Error verifying JWT token:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
