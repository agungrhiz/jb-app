import { Religion } from "@app/core/interfaces/religion";
import httpClientRequest from "@app/core/helpers/httpRequest";

export const getReligions = async (): Promise<Religion[]> => {
    const response = await httpClientRequest.get('religion');
    return response.data;
}

export const getReligion = async (id: number): Promise<Religion> => {
    const response = await httpClientRequest.get(`religion/${id}`);
    return response.data;
}

export const createOrUpdateReligion = async (religion: Religion): Promise<Religion> => {
    if (religion.id) {
        return await updateReligion(religion.id, religion);
    } else {
        return await createReligion(religion);
    }
}

export const createReligion = async (religion: Religion): Promise<Religion> => {
    const response = await httpClientRequest.post('religion', religion);
    return response.data;
}

export const updateReligion = async (id: number, religion: Religion): Promise<Religion> => {
    const response = await httpClientRequest.put(`religion/${id}`, religion);
    return response.data;
}

export const deleteReligion = async (id: number): Promise<Religion> => {
    const response = await httpClientRequest.delete(`religion/${id}`);
    return response.data;
}