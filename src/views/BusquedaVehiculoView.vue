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

@media (max-width: 1497px) {
  .vehiculo_perfil_usuario {
    display: flex;
    width: 100%;
    gap: 3rem;
    flex-direction: column;
  }

  .vehiculo_perfil_botones {
    display: flex;
    gap: 2rem;
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    width: 100%;
    height: 8rem;
    border-radius: 0.7rem;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
  }

  .ciudadano_boton {
    display: flex;
    height: 2rem;
    width: 5rem;
    align-items: center;
    justify-content: center;
    background-color: var(--colorBotonBusquedaCiudadano);
    color: var(--colorTextoTarjeta);
    text-decoration-line: none;
    margin-top: 5px;
  }

}

@media (max-width: 1120px) {

  .vehiculo_menu {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 2rem;
    height: 50rem;
  }

  .vehiculo_menu_izquierda {
    background-color: var(--colorFondoCiudadano2);
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
  }

  .vehiculo_menu_derecha {
    background-color: var(--colorFondoCiudadano2);
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
  }
}


@media (max-width: 787px) {

  .vehiculo_perfil_usuario_derecha {
    display: flex;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
  }
}
</style>s