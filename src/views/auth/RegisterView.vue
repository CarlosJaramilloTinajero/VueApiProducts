<script setup>
import { registerAPI } from '../../services/auth';
import router from '../../router';
import { notify } from '../../notify';
import { useStore } from "vuex";
import { computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength  } from '@vuelidate/validators'

const store = useStore();

// Variable reactiva para la informacion del formulario
const userFom = ref({
    name: '',
    password: '',
    email: '',
    password_confirmation: ''
});

// Reglas de validación con Vuelidate
const rules = computed(() => ({
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    password_confirmation: { required },
}));

const v$ = useVuelidate(rules.value, userFom.value);

// Se hace la peticion a la API con la informacion del formulario y el servicio de autenticaion
const handleSubmit = async () => {
    // Validacion del formulario
    const valid = await v$.value.$validate();

    if (!valid) return;

    v$.value.$reset();

    registerAPI({
        data: JSON.parse(JSON.stringify(userFom.value)),
        showNotify: true,
        funcSuccess: (response) => {
            localStorage.setItem('token', response.data.token_type + ' ' + response.data.access_token);
            localStorage.setItem('user_name', response.data.user_name);
            router.push('/');
            store.dispatch('setIsLoginAction');
        },
        funcError: data => {
            if (data.msg) notify(data.msg, 'error');
        }
    })
};

</script>

<template>

    <section class="container-auth">
        <p class="title">Registrarse</p>

        <form class="max-w-sm mx-auto" @submit.prevent="handleSubmit">
            <div class="mb-5">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                <input type="name" id="text" v-model="userFom.name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
            <p v-if="v$.name.$error" id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ v$.name.$errors[0].$message || 'Nombre inválido' }}</p>
            </div>
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" id="email" v-model="userFom.email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
            <p v-if="v$.email.$error" id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ v$.email.$errors[0].$message || 'Email inválido' }}</p>
            </div>
            <div class="mb-5">
                <label for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                <input type="password" id="password" v-model="userFom.password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
            <p v-if="v$.password.$error" id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ v$.password.$errors[0].$message || 'Contraseña inválida' }}</p>
            </div>

            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar
                    contraseña</label>
                <input type="password" id="password" v-model="userFom.password_confirmation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
            <p v-if="v$.password_confirmation.$error" id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ v$.password_confirmation.$errors[0].$message || 'Contraseña inválida' }}</p>
            </div>

            <div class="flex justify-center">
                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Crear</button>
            </div>
        </form>
        <p class="mt-3 text-center">¿Ya tienes cuenta? <router-link class="text-blue-600 visited:text-purple-600 "
                to="/login">Inicia sesión</router-link></p>
    </section>

</template>

<style scoped></style>