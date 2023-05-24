import express, { NextFunction, Request, Response } from 'express';
import { ConnectDB } from '@/config/database';
import { userRequestRouter } from '@/routes/userRequest.route';
import * as dotenv from 'dotenv';
import ErrorHandler from '@/helpers/errorHandler.helper';
import { roleRouter } from './routes/role.route';
import { authRouter } from './routes/auth.route';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const db = ConnectDB;

// Connect to database
db.initialize()
    .then(() => {
        console.log('Database connection established.');
    })
    .catch((err) => {
        console.log('Database connection failed.');
        console.log(err);
    });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.use('/auth', authRouter)
apiRouter.use('/user-request', userRequestRouter);
apiRouter.use('/role', roleRouter)

// Middleware to handle errors
app.use((_: Request, res: Response) => {
    const error = new Error('Not Found');
    res.status(404).json({ message: error.message });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    ErrorHandler.handle(error, req, res, next);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
