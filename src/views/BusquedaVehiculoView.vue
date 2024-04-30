<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import TitleBar from '@/components/ComponentesGenerales/TituloComponente.vue';
import SearchPanel from '@/components/BusquedaVehiculo/VehiculoBusquedaComponente.vue'
import ProfileSection from '@/components/BusquedaVehiculo/VehiculoPerfilComponente.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    
    components: {
        TitleBar,
        SearchPanel,
        ProfileSection
    },
    setup() {
        const selectedVehicleId = ref<number>(0);
        const route = useRoute();

        const handleSelectVehicle = (id: number) => {
            selectedVehicleId.value = id;
        };

        const containerHeight = computed(() => {
            return route.path.includes('/busquedaVehiculo/');
        });

        return { selectedVehicleId, handleSelectVehicle, containerHeight };
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