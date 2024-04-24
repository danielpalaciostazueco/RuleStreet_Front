<script lang="ts">
import { defineComponent } from 'vue';
import TitleBar from '@/components/ComponentesGenerales/TituloComponente.vue';
import SearchPanel from '@/components/BusquedaVehiculo/VehiculoBusquedaComponente.vue'
import ProfileSection from '@/components/BusquedaVehiculo/VehiculoPerfilComponente.vue';

export default defineComponent({
    components: {
        TitleBar,
        SearchPanel,
        ProfileSection
    }
});
</script>

<template>
    <div class="vehiculo_container">
        <title-bar title="BUSCAR VEHICULO" />
        <div class="vehiculo_menu">
            <search-panel />
            <profile-section />
        </div>
    </div>
</template>

<style scoped>
.vehiculo_container {
    background-color: var(--colorFondo);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
}


.vehiculo_menu {
    display: flex;
    flex-direction: row;
    width: 80%;
    gap: 2rem;
    height: 50rem;
}
</style>