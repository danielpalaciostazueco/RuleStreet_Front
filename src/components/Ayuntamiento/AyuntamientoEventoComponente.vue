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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
    gap: 20px;
}

.no-events {
    width: 100%;
    text-align: center;
    color: #666;
    font-size: 18px;
}

.info-card {
    width: calc(33.333% - 20px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: white;
}

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-content {
    padding: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-content h2 {
    font-size: 20px;
    color: #333;
}

.card-date {
    font-size: 16px;
    color: #888;
    margin-top: 10px;
    self-align: end;
}
</style>
