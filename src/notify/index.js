// ************  Toastyfy  *****************
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

// Creacion de notificaciones por tipo y mensaje
const notify = (msg = '', type = 'default') => {
    switch (type) {
        case 'success':
            return toast.success(msg);

        case 'info':
            return toast.info(msg);

        case 'warning':
            return toast.warn(msg);

        case 'error':
            return toast.error(msg);

        case 'loading':
            return toast.loading(msg);

        default:
            return toast(msg);
    }
};

// Funcion para actualizar las notificaciones con toastify
const updateNotify = (id, msg = '', type = 'error') => {
    let idT = setTimeout(() => {
        toast.update(id, {
            render: msg,
            autoClose: true,
            closeOnClick: true,
            closeButton: true,
            type: type,
            isLoading: false
        });
        window.clearTimeout(idT);
    }, 1500);
};

export { notify, updateNotify };