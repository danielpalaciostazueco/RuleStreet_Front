<script setup lang="ts">
import CiudadanoUsuarioComponente from '@/components/PerfilCiudadano/CiudadanoUsuarioComponente.vue';
</script>

<template>
    <div class="ciudadano_container">
        <CiudadanoUsuarioComponente />
    </div>
</template>


<style scoped>
.ciudadano_container {
    height: 100vh; 
    background-color: var(--colorFondo); 
    display: flex;
}

</style>
