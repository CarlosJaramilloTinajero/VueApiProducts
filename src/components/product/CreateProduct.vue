<script setup>
import { ref } from 'vue';
import { createProductAPI } from '../../services/products';
import useVuelidate from '@vuelidate/core'
import { required, minLength, minValue, numeric, integer } from '@vuelidate/validators'

// Variable reactiva para la informacion del formulario
const formData = ref({
    name: '',
    description: '',
    price: null,
    stock: null
});

// Reglas de validación con Vuelidate
const rules = {
    name: { required },
    description: { required, minLength: minLength(5) },
    price: { required, numeric, minValue: minValue(0.01) },
    stock: { required, numeric, integer, minValue: minValue(1) }
};

const v$ = useVuelidate(rules, formData.value);

// Guerdar los cambios del formulario, y envio del formulario a la API con el servicio de productos
const handleSubmit = async () => {
    // Validacion del formulario
    const valid = await v$.value.$validate();

    if (!valid) return;

    v$.value.$reset();

    createProductAPI({
        requestData: JSON.parse(JSON.stringify(formData.value)),
        showNotify: true,
        funcSuccess: (response) => {
            resetForm();
        }
    })
};

// Reseteo del formulario
const resetForm = () => {
    formData.value = {
        name: '',
        description: '',
        price: null,
        stock: null
    };
}
</script>

<template>
    <form class="max-w-md mx-auto" @submit.prevent="handleSubmit">
        <div class="relative z-0 w-full mb-5 group">
            <input placeholder=" " type="text" v-model="formData.name" id="floating_name"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
            <label for="floating_name"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
            <p v-if="v$.name.$error" id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ v$.name.$errors[0].$message || 'Nombre inválido' }}</p>
        </div>
        <div class="relative z-0 w-full mb-5 group">
            <input placeholder=" " step="0.01" type="number" v-model="formData.price" id="floating_price"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
            <label for="floating_price"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Precio</label>
                <p v-if="v$.price.$error" id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ v$.price.$errors[0].$message || 'Precio inválido' }}</p>
            </div>
        <div class="relative z-0 w-full mb-5 group">
            <input placeholder=" " type="number" v-model="formData.stock" id="floating_repeat_stock"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
            <label for="floating_repeat_stock"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Stock</label>
            <p v-if="v$.stock.$error" id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ v$.stock.$errors[0].$message || 'Stock inválido' }}</p>
        </div>
        <div class="relative z-0 w-full mb-5 group">
            <input placeholder=" " type="text" v-model="formData.description" id="floating_repeat_description"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
            <label for="floating_repeat_description"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descripción</label>
            <p v-if="v$.description.$error" id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ v$.description.$errors[0].$message || 'Descripcion inválido' }}</p>
        </div>
        <div class="flex justify-end gap-3 mt-6">
            <button type="submit"
                class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guardar</button>
            <router-link to="/"
                class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</router-link>
        </div>
    </form>
</template>

<style scoped></style>