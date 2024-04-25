<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
    <router-link to="/" class="ciudadano_boton">Volver</router-link>
</template>

<style scoped>
.ciudadano_boton {
    background-color: var(--colorBotonBusquedaCiudadano);
    width: 5rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--colorTextoTarjeta);
    text-decoration: none;
}

.ciudadano_boton:hover {
    background-color: var(--colorBotonBusquedaCiudadanoActivo);
    color: var(--colorBlanco);
}
</style>
