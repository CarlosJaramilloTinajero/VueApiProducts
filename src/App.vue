<script setup>
import { onMounted, computed } from 'vue'
import Header from './components/layout/Header.vue';
import { useStore } from 'vuex';
import Footer from './components/layout/Footer.vue';

const store = useStore();

// Constante computada para validar si el usuario esta logeado
const showHeaderAndFooter = computed(() => {
  return store.state.authModule.isLogin;
});

onMounted(() => {
  // Se ejcuta la accion setIsLoginAction de vuex, para validar que exista una sesion activa.
  store.dispatch('setIsLoginAction');
});
</script>

<template>
  <section class="app">
    <div class="conatiner-app">
      <Header v-show="showHeaderAndFooter" />
        <router-view></router-view>
      <Footer v-show="showHeaderAndFooter" />
    </div>
  </section>


</template>

<style scoped></style>
