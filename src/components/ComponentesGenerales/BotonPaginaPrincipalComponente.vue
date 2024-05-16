<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
    <router-link to="/" class="ciudadano_boton">Volver</router-link>
</template>

<style scoped>
.ciudadano_boton {
  @apply bg-[color:var(--colorBotonBusquedaCiudadano)] w-20 h-8 flex justify-center items-center text-[color:var(--colorTextoTarjeta)] no-underline hover:bg-[color:var(--colorBotonBusquedaCiudadanoActivo)] hover:text-[color:var(--colorBlanco)];
}

</style>
