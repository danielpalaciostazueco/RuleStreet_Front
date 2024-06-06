<script lang="ts">
import { computed, defineComponent, ref, onMounted, onUnmounted } from 'vue';
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
    const windowWidth = ref(window.innerWidth);

    const handleSelectVehicle = (id: number) => {
      selectedVehicleId.value = id;
    };

    const handleResize = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    const containerHeight = computed(() => {
      if (windowWidth.value <= 1170) {
        return 'auto';
      }
    });



    return { selectedVehicleId, handleSelectVehicle, containerHeight };
  }
});


</script>

<template>
  <div class="vehiculo_container">
    <title-bar :title="$t('RangoPerfil.SearchVehicle')" />
    <div class="vehiculo_menu" :style="{ height: containerHeight }">
      <search-panel />
      <profile-section />
    </div>
  </div>
</template>

<style scoped>
.vehiculo_container {
  @apply bg-[color:var(--colorFondo)] min-h-screen flex flex-col items-center justify-center gap-12;
}

.vehiculo_menu {
  @apply flex flex-row w-4/5 gap-8 h-[50rem];
}

.vehiculo_menu_izquierda {
  @apply flex w-1/5 flex-col gap-8 bg-[color:var(--colorFondoCiudadano2)] py-8 rounded-lg;
}

@media (max-width: 1497px) {
  .vehiculo_perfil_usuario {
    @apply flex w-full gap-12 flex-col;
  }

  .vehiculo_perfil_botones {
    @apply flex gap-8 bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full h-32 justify-center items-center mt-[25px] rounded-[0.7rem];
  }

  .ciudadano_boton {
    @apply flex h-8 w-20 items-center justify-center bg-[color:var(--colorBotonBusquedaCiudadano)] text-[color:var(--colorTextoTarjeta)] no-underline mt-[5px];
  }
}

@media (max-width: 1120px) {
  .vehiculo_menu {
    @apply flex flex-col w-4/5 gap-8 h-[50rem];
  }

  .vehiculo_menu_izquierda {
    @apply bg-[color:var(--colorFondoCiudadano2)] w-full flex flex-col gap-8 py-8 rounded-lg;
  }

  .vehiculo_menu_derecha {
    @apply bg-[color:var(--colorFondoCiudadano2)] w-full flex flex-col gap-8 py-8 rounded-lg;
  }
}

@media (max-width: 787px) {
  .vehiculo_perfil_usuario_derecha {
    @apply flex grid-cols-custom gap-4 justify-center items-center w-full flex-col;
  }

  .vehiculo_container{
    padding: 2rem;
  }
}
</style>s