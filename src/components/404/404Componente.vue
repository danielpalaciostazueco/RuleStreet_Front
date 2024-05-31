<script lang="ts">
import { defineComponent } from 'vue';
import icono from '../../assets/Imagenes/icono.png';

export default defineComponent({
    name: 'NotFoundPage',
    setup() {
        return {
            icono,
        };
    },
});
</script>
<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-[var(--colorFondo)] text-[var(--colorSvg)] gap-8">
        <img class="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72" :src="icono" alt="Icono">
        <h1 class="text-6xl md:text-7xl lg:text-8xl">404</h1>
        <p class="w-full flex justify-center text-lg md:text-xl lg:text-2xl">Página no encontrada</p>
    </div>
</template>

