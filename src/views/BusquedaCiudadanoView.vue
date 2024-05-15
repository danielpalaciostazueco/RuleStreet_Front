<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import TitleBar from '@/components/ComponentesGenerales/TituloComponente.vue';
import SearchPanel from '@/components/BusquedaCiudadano/CiudadanoBusquedaComponente.vue'
import ProfileSection from '@/components/BusquedaCiudadano/CiudadanoPerfilComponente.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    components: {
        TitleBar,
        SearchPanel,
        ProfileSection
    },
    setup() {
        const selectedCitizenId = ref<number>(0);
        const route = useRoute();

        const handleSelectCitizen = (id: number) => {
            selectedCitizenId.value = id;
        };

        const containerHeight = computed(() => {
            return route.path.includes('/busquedaCiudadano/') ? '90rem' : '50rem';
        });

        return { selectedCitizenId, handleSelectCitizen, containerHeight };
    }
});
</script>

<template>
    <body>
        <div class="ciudadano_container">
        <title-bar title="BUSCAR CIUDADANO" />
        <div class="ciudadano_menu" :style="{ height: containerHeight }">
            <search-panel @select-citizen="handleSelectCitizen" />
            <profile-section :selectedCitizenId="selectedCitizenId" />
        </div>
    </div>
    
    </body>
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
  min-height: 90rem; /* Ensures the menu has a minimum height */
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
