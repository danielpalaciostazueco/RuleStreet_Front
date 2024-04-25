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
        <h1>404</h1>
        <p>Página no encontrada</p>
    </div>
</template>

<style scoped>
.notFound_sectionContainer {
    min-height: 100vh;
    justify-content: center;
    display: flex;
    background-color: var(--colorFondo);
    color: var(--colorSvg);
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.notFound_sectionContainer p {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
}

.notFound_sectionContainer h1 {
    display: flex;
    justify-content: center;
    font-size: 5rem;
}

.notFound_img {
    width: 12rem;
    height: 12rem;
}
</style>