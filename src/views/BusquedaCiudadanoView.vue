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
    <div class="ciudadano_container">
        <title-bar title="BUSCAR CIUDADANO" />
        <div class="ciudadano_menu" :style="{ height: containerHeight }">
            <search-panel @select-citizen="handleSelectCitizen" />
            <profile-section :selectedCitizenId="selectedCitizenId" />
        </div>
    </div>
</template>

<style scoped>
.ciudadano_container {
    padding: 2rem;
    background-color: var(--colorFondo);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
}


.ciudadano_menu {
    display: flex;
    flex-direction: row;
    width: 80%;
    gap: 2rem;
    height: 90rem;
}
</style>