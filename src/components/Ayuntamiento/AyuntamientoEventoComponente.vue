<template>
    <div class="info-container">
        <div v-if="infoEventos.length === 0" class="no-events">
            <h2>No hay eventos disponibles en este momento.</h2>
        </div>
        <div class="info-card" v-for="evento in infoEventos" :key="evento.idEventos">
            <img :src="evento.imagen" :alt="evento.descripcion" class="card-image">
            <div class="card-content">
                <h2>{{ evento.descripcion }}</h2>
                <p class="card-date">
                    Fecha: {{ fechaFormato(evento.fecha) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useListadoEvento } from '@/stores/storeEventos';
import type { Evento } from '@/stores/storeEventos';

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
.info-container {
    @apply flex flex-wrap justify-around p-5 gap-5;
}

.no-events {
    @apply w-full text-center text-gray-600 text-lg;
}

.info-card {
    @apply w-full md:w-1/2 lg:w-1/3 shadow-lg rounded-lg overflow-hidden flex flex-col bg-white;
}

.card-image {
    @apply w-full h-48 object-cover;
}

.card-content {
    @apply p-4 flex-grow flex flex-col justify-between;
}

.card-content h2 {
    @apply text-xl text-gray-800;
}

.card-date {
    @apply text-base text-gray-600 mt-2 self-end;
}
</style>
