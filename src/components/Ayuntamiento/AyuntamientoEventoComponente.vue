<template>
  <div class="ayuntamiento_container">
    <div class="info-container flex flex-wrap justify-around p-5 gap-5">
      <div v-if="infoEventos.length === 0" class="no-events w-full text-center text-textoTarjeta text-lg">
        <h2>{{ $t('EventoAyuntamiento.Title') }}</h2>
      </div>
      <div class="info-card w-[calc(33.333%-20px)] shadow-lg rounded-lg overflow-hidden flex flex-col bg-white"
        v-for="evento in infoEventos" :key="evento.idEventos">
        <img v-if="locale === 'es'" :src="evento.imagen" :alt="evento.descripcion ?? ''"
          class="card-image w-full h-52 object-cover">
        <img v-if="locale === 'en'" :src="evento.imagen" :alt="evento.description ?? ''"
          class="card-image w-full h-52 object-cover">
        <div class="card-content p-4 flex-grow flex flex-col justify-between">
          <h2 v-if="locale === 'en'" class="text-xl text-tituloModal">{{ evento.descripcion }}</h2>
          <h2 v-if="locale === 'es'" class="text-xl text-tituloModal">{{ evento.description }}</h2>
          <p class="card-date text-base text-negro mt-2 self-end">
            {{ $t('EventoAyuntamiento.Date') }} {{ fechaFormato(evento.fecha) }}
          </p>
        </div>
      </div>
    </div>
    <div class="boton_div">
      <BotonPaginaPrincipalComponente />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useListadoEvento } from '@/stores/storeEventos';
import type { Evento } from '@/stores/storeEventos';
import { useI18n } from 'vue-i18n';
import BotonPaginaPrincipalComponente from '../ComponentesGenerales/BotonPaginaPrincipalComponente.vue';

const { t, locale } = useI18n();
const store = useListadoEvento();
const { infoEventos } = store;

onMounted(() => {
  store.cargarDatosEventos();
});

const fechaFormato = (fecha: string | Date): string => {
  const fechaObj = new Date(fecha);
  if (isNaN(fechaObj.getTime())) {
    return 'Fecha inválida';
  }
  const opciones: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };
  return fechaObj.toLocaleDateString('es-ES', opciones);
};
</script>
<style scoped>
.ayuntamiento_container {
  display: flex;
  min-height: 100vh; 
  background-color: var(--colorFondo);
  flex-direction: column;
  padding: 2rem;
}

.boton_div{
  display: flex;
  justify-content: center;
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
  border-radius: 10px;
}

.info-container {
  @apply flex flex-wrap justify-around p-5 gap-5;
}

.no-events {
  @apply w-full text-center text-textoTarjeta text-lg;
}

.info-card {
  @apply shadow-lg rounded-lg overflow-hidden flex flex-col bg-white;
  width: calc(33.333% - 20px);
  transition: width 0.3s ease;
}

.card-image {
  @apply w-full object-cover;
  height: calc(200px + 1vw);
}

.card-content {
  @apply p-4 flex-grow flex flex-col justify-between;
}

.card-content h2 {
  @apply text-xl text-tituloModal;
}

.card-date {
  @apply text-base text-negro mt-2 self-end;
}

@media (max-width: 1024px) {
  .info-card {
    @apply w-[calc(50%_-_20px)];
  }

  .card-image {
    @apply h-[calc(150px_+_1vw)];
  }
}

@media (max-width: 768px) {
  .info-card {
    @apply w-[calc(100%_-_20px)];
  }

  .card-image {
    @apply h-[calc(120px_+_1vw)];
  }
}

@media (max-width: 480px) {
  .info-card {
    @apply w-[calc(100%_-_20px)];
  }

  .card-image {
    @apply h-[calc(100px_+_1vw)];
  }
}
</style>
