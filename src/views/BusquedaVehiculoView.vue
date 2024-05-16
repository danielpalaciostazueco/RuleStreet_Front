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
    <div class="ciudadano_container">
        <title-bar title="BUSCAR VEHICULO" />
        <div class="ciudadano_menu">
            <search-panel />
            <profile-section />
        </div>
    </div>
</template>


<style scoped>
body {
  @apply bg-[color:var(--colorFondo)];
}

.ciudadano_container {
  @apply bg-[color:var(--colorFondo)] min-h-screen flex flex-col items-center justify-center gap-12 p-8;
}

.ciudadano_menu {
  @apply flex flex-row w-full gap-8;

}

@media screen and (max-width: 1024px) {
  .ciudadano_menu {
    @apply flex-col;
    min-height: auto;
  }
}

@media screen and (max-width: 768px) {
  .ciudadano_menu {
    @apply flex-col w-full;
    min-height: auto;
  }
}

@media screen and (max-width: 480px) {
  .ciudadano_menu {
    @apply flex-col w-full;
    min-height: auto;
    gap: 4; /* Reduce gap between elements for small screens */
  }
}
</style>