import axios from "axios";
import { notify } from "../notify";
import { URL_API } from "../constants";

class conecction {

    // Se creauna instancia de axios con una configuracion base
    constructor() {
        this.axiosCon = axios.create({
            baseURL: URL_API
        });
    }

    // Metodo asincrono que maneja una solicitud HTTP con Axios
    async loadData({ method = '', url = '', data = {}, authorization = false, errorResponse = false }) {
        const header = {};

        // Si para la peticion se requiere el token de autenticacion y si este existe dentro del local storage
        if (authorization && localStorage.getItem('token')) header['Authorization'] = localStorage.getItem('token');

        try {
            return await this.axiosCon({
                method: method,
                url: url,
                data: data,
                headers: header
            });
        } catch (error) {

            // Si el codigo de estatus de la peticion es 500, notificamos al usuario con un error
            if (errorResponse && error.response.status === 500) {
                notify('¡Error en el servidor!', 'error')
                return;
            }

            // Si el codigo de estatus de la peticion es 400, notificamos al usuario con el mensaje de error de la respuesta 
            if (error?.response?.status === 400) {
                if (error.response.data.mgs) notify(error.response?.data?.mgs, 'error');
            }

            // Si el codigo de estatus de la peticion es 401, se eliminina el token y nombre de usuario del locale storage
            if (error?.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user_name');
            }
        }
    }
};

export default conecction;