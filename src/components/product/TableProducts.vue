<script setup>
import { ref, onMounted } from 'vue';
import { deleteProductAPI, getProductsByAPI } from '../../services/products';
import router from '../../router';

// Productos obtenidos po la api
const products = ref([]);

// Variables reactivas para la paginacion
const page = ref(1);
const pages = ref(0);
const perPage = ref(10);

// Variable reactiva para los filtros
const filters = ref({
    name: '',
    minPrice: null,
    maxPrice: null,
    inStock: null
});

// Obtiene los productos de la API, usando el servicio de productos
const getProducts = () => {
    getProductsByAPI({
        page: page.value,
        filters: filters.value,
        perPage: perPage.value,
        funcSuccess: (response) => {
            products.value = response.data.products.data;
            pages.value = response.data.products.last_page;
            page.value = response.data.products.current_page;
        }
    });
};

// Cambia el valor de la pagina actual, cuando se aplica un filtro
const changeFilter = () => {
    page.value = 1;
    getProducts();
}; 

// Cambio de pagina
const setPage = number => {
    if(number > pages.value || number <= 0) return;
    page.value = number;
    getProducts();
}

// Redireccionamiento a la ruta de editar producto, con el id dado como parametro
const editProduct = id => router.push(`/product/edit/${id}`);

// Elimina un producto utilizando el servicio de productos, con una confirmacion previa
const deleteProduct = id => {
    const confirm = window.confirm('¿Estas seguro de eliminar el producto?');

    if(confirm){
        deleteProductAPI({
            showNotify: true,
            productId: id,
            funcSuccess: (response) => {
                getProducts();
            }
        })
    }
}

// Se cargan los productos al montar el componente
onMounted(() => {
   getProducts(); 
});

</script>

<template>
    <div class="flex justify-end mb-4">
        <router-link to="/product/create" class="cursor-pointer mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Agregar</router-link>
    </div>

    <!-- Filtros -->
    <div class="block lg:flex gap-2 justify-between mb-6">
        <div class="flex flex-col md:flex-row lg:flex-row gap-2">
            <div class="w-full">
                <label for="min_price" class="mb-1 block font-medium text-sm text-gray-700">Min Precio</label>
                <input type="number" @change="changeFilter" id="min_price" v-model="filters.minPrice" class="w-full w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div class="w-full">
                <label for="max_price" class="mb-1 block font-medium text-sm text-gray-700">Max Precio</label>
                <input type="number" @change="changeFilter" id="max_price" v-model="filters.maxPrice" class="w-full w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
        </div>

        <div class="flex gap-2 mt-4 lg:mt-0 lg:ml-auto">
            <div class="flex-grow mt-6 min-w-50">
                <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text"
                        @change="changeFilter"
                        v-model="filters.name"
                        id="table-search"
                        class="block py-2.5 pl-10 pr-3 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar por nombre.">
                </div>
            </div>

            <div class="min-w-20">
                <label for="perPage" class="mb-1 block font-medium text-sm text-gray-700">Por pagina</label>
                <select id="perPage" v-model="perPage" @change="changeFilter"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </div>
        </div>
    </div>
    <!-- Fin filtros -->

    <!-- Tabla -->
    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Nombre
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Descripción
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Precio
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Stock
                    </th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in products" :key="item.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ item.name }}
                    </th>
                    <td class="px-6 py-4">
                        {{ item.description }}
                    </td>
                    <td class="px-6 py-4">
                        ${{ item.price }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.stock }}
                    </td>
                    <td class="px-6 py-2">
                        <div class="flex gap-2 justify-center">
                            <svg @click="editProduct(item.id)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-pen cursor-pointer" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                            </svg>

                            <svg @click="deleteProduct(item.id)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash3 cursor-pointer" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Paginacion -->
    <nav class="mt-5">
        <ul class="inline-flex -space-x-px text-sm">
            <li>
                <a @click="setPage(page - 1)" class="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Anterior</a>
            </li>
            <li v-for="n in pages" :key="n">
                <a :class=" n == page ? 'cursor-pointer flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
                    @click="setPage(n)">{{ n }}</a>
            </li>
            <li>
                <a @click="setPage(page + 1)" class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Siguiente</a>
            </li>
        </ul>
    </nav>
</template>

<style scoped></style>