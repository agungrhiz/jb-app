import { UserRequest } from '@app/core/interfaces/userRequest';
import { createSlice } from '@reduxjs/toolkit';
import { register } from '@app/core/redux/actions/userRequestActions';

interface UserRequestState {
    userRequests: UserRequest[];
    selectedUserRequest: UserRequest | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserRequestState = {
    userRequests: [],
    selectedUserRequest: null,
    loading: false,
    error: null,
};

const userRequestSlice = createSlice({
    name: 'userRequests',
    initialState,
    reducers: {
        clearSelectedUserRequest(state) {
            state.selectedUserRequest = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.userRequests.push(action.payload);
            state.loading = false;
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Failed to create user request.';
        })
    }
});

export const { clearSelectedUserRequest } = userRequestSlice.actions;