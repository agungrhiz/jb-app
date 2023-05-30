import { createAsyncThunk } from '@reduxjs/toolkit';
import { Religion } from '@app/core/interfaces/religion';
import {
  getReligions,
  getReligion,
  createOrUpdateReligion,
  deleteReligion,
} from '@app/core/services/religionService';

export const fetchReligions = createAsyncThunk('religions/fetchAll', async () => {
  const religions = await getReligions();
  if (!religions) throw new Error('Failed to fetch religions.');
  return religions;
});

export const fetchReligion = createAsyncThunk(
  'religions/fetchById',
  async (id: number) => {
    const religion = await getReligion(id);
    return religion;
  }
);

export const saveReligion = createAsyncThunk(
  'religions/save',
  async (religion: Religion) => {
    const savedReligion = await createOrUpdateReligion(religion);
    return savedReligion;
  }
);

export const removeReligion = createAsyncThunk(
  'religions/remove',
  async (id: number) => {
    await deleteReligion(id);
    return id;
  }
);
