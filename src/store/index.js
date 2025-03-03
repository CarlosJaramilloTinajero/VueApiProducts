import { createStore } from "vuex";
import authModule from "./modules/auth";

const store = createStore({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        authModule: authModule
    }
});

export default store;