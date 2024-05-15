<script lang="ts">
import { defineComponent } from 'vue';
import TitleBar from '@/components/ComponentesGenerales/TituloComponente.vue';
import SearchPanel from '@/components/BusquedaPolicia/PoliciaBusquedaComponente.vue'
import ProfileSection from '@/components/BusquedaPolicia/PoliciaPerfilComponente.vue';

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
        <title-bar title="BUSCAR POLICIA" />
        <div class="ciudadano_menu">
            <search-panel />
            <profile-section />
        </div>
    </div>
</template>

<style scoped>
.ciudadano_container {
  @apply bg-[color:var(--colorFondo)] min-h-screen flex flex-col items-center justify-center gap-12 p-8;
}
.ciudadano_menu {
  @apply flex flex-row w-4/5 gap-8 h-[90rem];
}

</style>