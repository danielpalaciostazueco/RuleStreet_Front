<script lang="ts">
import { computed, defineComponent, ref, onMounted, onUnmounted } from 'vue';
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
    const windowWidth = ref(window.innerWidth);

    const handleResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    const handleSelectCitizen = (id: number) => {
      selectedCitizenId.value = id;
    };

    const containerHeight = computed(() => {
      if (windowWidth.value <= 1410) {
        return 'auto'; 
      }
      return route.path.includes('/busquedaCiudadano/') ? '90rem' : '50rem';
    });

    return { selectedCitizenId, handleSelectCitizen, containerHeight };
  }
});
</script>

<template>
  <html>

  <body>
    <div class="ciudadano_container">
      <title-bar :title="$t('RangoPerfil.SearchCitizen')" />
      <div class="ciudadano_menu" :style="{ height: containerHeight }">
        <search-panel @select-citizen="handleSelectCitizen" />
        <profile-section :selectedCitizenId="selectedCitizenId" />
      </div>
    </div>
  </body>

  </html>
</template>

<style scoped>
template,
html,
body {
  @apply bg-[color:var(--colorFondo)];
  height: 120%;
}

.ciudadano_container {
  @apply bg-[color:var(--colorFondo)] min-h-screen flex flex-col items-center justify-center gap-12 p-8;
}

.ciudadano_menu {
  @apply flex flex-row w-full gap-8;

}
@media screen and (max-width: 1160px){
  .ciudadano_menu{
    gap: 1rem;
  }
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

  html,
  body {
    @apply bg-[color:var(--colorFondo)];
    height: 465vh;
  }

  .ciudadano_menu {
    @apply flex-col w-full;
    min-height: auto;
    gap: 4;

  }
}
</style>
