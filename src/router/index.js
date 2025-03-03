
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from "../views/auth/RegisterView.vue";
import CreateProduct from "../views/product/CreateProduct.vue";
import EditProduct from "../views/product/EditProduct.vue";

const routes = [
    // Inicio
    { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },

    // Productos
    { path: '/product/create', name: 'product-create', component: CreateProduct, meta: { requiresAuth: true } },
    { path: '/product/edit/:id', name: 'product-edit', component: EditProduct, meta: { requiresAuth: true } },

    // Auth
    { path: '/login', name: 'login', component: LoginView, meta: { requiresGuest: true } },
    { path: '/register', name: 'register', component: RegisterView, meta: { requiresGuest: true } },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// Guards de las rutas
router.beforeEach((to, from) => {

    // Se valida que exista una sesion activa con las variables del localstorage 'token' y 'user_name'
    const isAuthenticated = localStorage.getItem('token') && localStorage.getItem('user_name');

    // guest
    if (to.meta.requiresGuest && isAuthenticated) {
        return { name: 'home' };
    }

    // auth
    if (to.meta.requiresAuth && !isAuthenticated) {
        return { name: 'login' };
    }

    return true;
});

export default router;
