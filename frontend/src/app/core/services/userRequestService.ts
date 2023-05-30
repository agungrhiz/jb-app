import { RegisterDto } from "@app/core/interfaces/registerDto";
import { UserRequest } from "@app/core/interfaces/userRequest";
import httpClientRequest from "@app/core/helpers/httpRequest";

export const createUserRequest = async (userRequest: RegisterDto): Promise<UserRequest> => {
    const response = await httpClientRequest.post('user-request', userRequest);
    return response.data;
}