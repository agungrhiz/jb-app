import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserRequest } from '@app/core/services/userRequestService';
import { RegisterDto } from '@app/core/interfaces/registerDto';

export const register = createAsyncThunk(
    'user-request/create',
    async (userRequest: RegisterDto) => {
        const response = await createUserRequest(userRequest);
        return response;
    }
);