import { createSlice } from '@reduxjs/toolkit';
import { Religion } from '@app/core/interfaces/religion';
import {
  fetchReligions,
  fetchReligion,
  saveReligion,
  removeReligion,
} from '@app/core/redux/actions/religionActions';

interface ReligionState {
  religions: Religion[];
  selectedReligion: Religion | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReligionState = {
  religions: [],
  selectedReligion: null,
  loading: false,
  error: null,
};

const religionSlice = createSlice({
  name: 'religions',
  initialState,
  reducers: {
    clearSelectedReligion(state) {
      state.selectedReligion = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReligions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReligions.fulfilled, (state, action) => {
        state.religions = action.payload;
        state.loading = false;
      })
      .addCase(fetchReligions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch religions.';
      })
      .addCase(fetchReligion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReligion.fulfilled, (state, action) => {
        state.selectedReligion = action.payload;
        state.loading = false;
      })
      .addCase(fetchReligion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch religion.';
      })
      .addCase(saveReligion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveReligion.fulfilled, (state, action) => {
        const savedReligion = action.payload;
        const index = state.religions.findIndex((r) => r.id === savedReligion.id);
        if (index !== -1) {
          state.religions[index] = savedReligion;
        } else {
          state.religions.push(savedReligion);
        }
        state.loading = false;
        state.selectedReligion = savedReligion;
      })
      .addCase(saveReligion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to save religion.';
      })
      .addCase(removeReligion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeReligion.fulfilled, (state, action) => {
        const id = action.payload;
        state.religions = state.religions.filter((r) => r.id !== id);
        state.loading = false;
        state.selectedReligion = null;
      })
      .addCase(removeReligion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to delete religion.';
      });
  },
});

export default religionSlice.reducer;
