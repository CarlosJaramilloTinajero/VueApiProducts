import conecction from "../connection";
import { notify, updateNotify } from "../notify";

// Creacioon de una instancia de la clase connection para hacer peticiones HTTP
const classConecction = new conecction();

// Realiza una petición API y devuelve los datos
export const fetchData = async ({ url, method, requestData = {}, authorization = false }) => {
    try {
        const { data } = await classConecction.loadData({ url, method, data: requestData, authorization });
        return await data;
    } catch (error) {
        return null;
    }
}

// Ejecuta una petician a la API con notificaciones y funciones de exito y error
export const makeApiRequest = async ({ url, method, requestData = {}, funcSuccess = () => { }, funcError = () => { }, showNotify = false, msgSuccess = '¡Exito!', msgError = '¡Error!', authorization = false }) => {
    let idNotify = null;
    if (showNotify) idNotify = notify('Cargando...', 'loading');

    try {
        const data = await fetchData({ url, method, requestData, authorization });

        if (data && data.status) {
            if (idNotify) updateNotify(idNotify, msgSuccess, 'success');
            funcSuccess(data);
        } else {
            if (idNotify) updateNotify(idNotify, msgError, 'error');
            funcError(data);
        }
    } catch (error) {
        funcError();
        if (idNotify) updateNotify(idNotify, msgError, 'error');
    }

} 