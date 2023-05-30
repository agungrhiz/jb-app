import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@app/core/redux/slices/authSlice';
import religionReducer from '@app/core/redux/slices/religionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    religions: religionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;