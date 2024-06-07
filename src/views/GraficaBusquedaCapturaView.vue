<script setup lang="ts">
import GraficaBusquedaCapturaComponent from '@/components/BusquedaCaptura/GraficaBusquedaCapturaComponent.vue';
</script>

<template>
    <div class="app-background">
        <GraficaBusquedaCapturaComponent />
    </div>
</template>

<style scoped>
.app-background {
    background-color: var(--colorFondo);
    min-height: 100vh;
}
</style>