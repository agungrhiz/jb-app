import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout } from '@app/core/services/authService';
import { LoginDto } from '@app/core/interfaces/loginDto';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (loginDto: LoginDto) => {
        const response = await login(loginDto);
        if (!response.ok) throw new Error(response.error);
        return response.data.token;
    }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await logout();
});
