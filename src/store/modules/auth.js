const authModule = {
    state: {
        isLogin: false, // Indica si el usuario está autenticado
        dataUser: {
            name: '' // Almacena el nombre del usuario autenticado
        }
    },
    mutations: {
        /**
        * Actualiza el estado de autenticación del usuario.
        */
        setIsLogin(state, payload) {
            state.isLogin = payload;
        },

        /**
       * Guarda los datos del usuario autenticado.
       */
        setDataUser(state, payload) {
            state.dataUser = payload;
        }
    },
    actions: {
        /**
       * Verifica si hay un usuario autenticado guardado en localStorage
       * Si encuentra un token y un user_name, establece el estado de autenticacion.
       */
        setIsLoginAction({ commit, dispatch }) {
            const bool = (localStorage.getItem('token') && localStorage.getItem('user_name')) !== null;
            if (bool) dispatch('setDataUserAction');
            commit('setIsLogin', bool);
        },

        /**
        * Carga los datos del usuario desde localStorage y los guarda en el estado global vuex.
        */
        setDataUserAction({ commit, state }) {
            const aux = {
                name: localStorage.getItem('user_name') || ''
            }

            commit('setDataUser', aux);
        },

        /**
         * Cierra la sesion del usuario eliminando sus datos de localStorage y reseteando el estado de autenticacion en vuex.
        */
        logoutUser({ commit, dispatch }) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_name');
            commit('setIsLogin', false);
            commit('setDataUser', {
                name: ''
            });
        }
    }
}

export default authModule;