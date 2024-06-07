<script setup lang="ts">
import BusquedaDeudoresComponente from '../components/BusquedaDeudores/BusquedaDeudoresComponente.vue';
</script>

<template>
    <div class="app-background">
        <BusquedaDeudoresComponente />
    </div>
</template>

<style scoped>
.app-background {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background-color: var(--colorFondo);
    min-height: 100vh;
}
</style>