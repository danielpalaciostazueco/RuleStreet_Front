<script lang="ts">
import { defineComponent } from 'vue';
import TitleBar from '@/components/ComponentesGenerales/TituloComponente.vue';
import SearchPanel from '@/components/BusquedaCiudadano/CiudadanoBusquedaComponente.vue'
import ProfileSection from '@/components/BusquedaCiudadano/CiudadanoPerfilComponente.vue';

export default defineComponent({
    components: {
        TitleBar,
        SearchPanel,
        ProfileSection
    }
});
</script>

<template>
    <div class="ciudadano_container">
        <title-bar title="BUSCAR CIUDADANO" />
        <div class="ciudadano_menu">
            <search-panel />
            <profile-section />
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