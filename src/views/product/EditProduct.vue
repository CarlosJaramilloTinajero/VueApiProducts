<script setup>
import EditProduct from '../../components/product/editProduct.vue';
import router from '../../router';
const productId = router.currentRoute.value.params.id;
</script>

<template>
        <div class="conatiner-app-body">
        <p class="title">Editar producto</p>

        <EditProduct :product-id="productId" />
    </div>
</template>

<style scoped></style>