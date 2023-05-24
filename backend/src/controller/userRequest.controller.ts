import { Request, Response } from 'express';
import { UserRequestService } from '@/services/userRequest.service';
import RequestStatus from '@/models/enum/requestStatus';
import { JwtPayload } from 'jsonwebtoken';
import { UniqueIdHelper } from '@/helpers/uuid.helper';

interface AuthRequest extends Request {
    user?: JwtPayload;
}

export class UserRequestController {
    private userRequestService: UserRequestService;

    constructor() {
        this.userRequestService = new UserRequestService();
    }

    public updateRequestStatus = async (req: AuthRequest, res: Response): Promise<Response> => {
        const id = req.params.id;
        const status = req.query.status as RequestStatus;
        const approvedBy = req.user?.userId;

        if (!id || !status) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const data = await this.userRequestService.updateStatus(Number(id), status, approvedBy);
            if (!data) {
                return res.status(404).json({ error: 'User Request not found' });
            }

            if (status === RequestStatus.Approved) {
                const token = UniqueIdHelper.generate();
                // await this.userRequestService.approveRequest(data, token);
                await this.userRequestService.sendEmailVerification(data, token);
            } else if (status === RequestStatus.Rejected) {
                await this.userRequestService.sendEmailRejection(data);
            } else {
                return res.status(400).json({ error: 'Invalid status' });
            }

            return res.json({ message: 'User Request updated successfully'});
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
