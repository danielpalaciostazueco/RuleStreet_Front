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
    <div class="notFound_sectionContainer">
        <img class="notFound_img" :src="icono" alt="Icono">
        <h1 class="notFound_h1">404</h1>
        <p class="notFound_p">Página no encontrada</p>
    </div>
</template>

<style scoped>
.notFound_sectionContainer {
    @apply min-h-screen flex flex-col items-center justify-center bg-[var(--colorFondo)] text-[var(--colorSvg)] gap-8;
}

.notFound_p {
    @apply w-full flex justify-center text-lg md:text-xl lg:text-2xl;
}

.notFound_h1 {
    @apply flex justify-center text-6xl md:text-7xl lg:text-8xl;
}

.notFound_img {
    @apply w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72;
}
</style>
