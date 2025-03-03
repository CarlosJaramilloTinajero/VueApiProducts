import { makeApiRequest } from "../auxiliar";

export function loginAPI({ credentials, showNotify = false, funcSuccess = () => { }, funcError = () => { } }) {
    makeApiRequest({
        url: '/auth/login',
        method: 'post',
        requestData: credentials,
        funcSuccess,
        funcError,
        msgError: 'Las credenciales no coinden',
        msgSuccess: 'Logeado corerctamente',
        showNotify
    });
}

export function registerAPI({ data, showNotify = false, funcSuccess = () => { }, funcError = () => { } }) {
    makeApiRequest({
        url: '/auth/register',
        method: 'post',
        requestData: data,
        funcSuccess,
        funcError,
        msgError: 'Error al crear al usuario',
        msgSuccess: 'Logeado corerctamente',
        showNotify
    });
}