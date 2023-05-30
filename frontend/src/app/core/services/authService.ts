import httpClientRequest from "@app/core/helpers/httpRequest";
import { LoginDto } from "@app/core/interfaces/loginDto";

export const login = async (loginDto: LoginDto) => {
    const credentials = { email: loginDto.email, password: loginDto.password };
    const response = await httpClientRequest.post('auth/login', credentials);

    if (loginDto.rememberMe) {
        localStorage.setItem('credentials', JSON.stringify(credentials));
    } else {
        localStorage.removeItem('credentials');
    }

    const token = response.data.token;
    sessionStorage.setItem('token', token);

    return response.data;
}

export const logout = async () => {
    sessionStorage.removeItem('token');
}