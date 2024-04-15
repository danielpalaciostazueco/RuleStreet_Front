<script setup lang="ts">
import { RouterView } from 'vue-router';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/HeaderComponent.vue';
import Footer from './components/FooterComponent.vue';
const route = useRoute();

const showHeaderAndFooter = computed(() => route.name !== 'NotFound' && route.name !== 'AdminPanel' && route.name !== 'Login');
</script>

<template>
    <Header v-if="showHeaderAndFooter"></Header>
    <RouterView></RouterView>
    <Footer v-if="showHeaderAndFooter"></Footer>
</template>