<template>
    <div class="info-container">
        <div class="info-card" v-for="evento in infoEventos" :key="evento.idEventos">
            <img :src="evento.imagen" :alt="evento.descripcion" class="card-image">
            <div class="card-content">
                <h2>{{ evento.descripcion }}</h2>
                <div class="card-date">
                    Fecha: {{ evento.fecha | fechaFormato }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useListadoEvento } from '@/stores/storeEventos';


const { infoEventos } = useListadoEvento();


onMounted(() => {
    store.cargarDatosEventos();
});

// Formateador de fechas
const fechaFormato = fecha => {
    const fechaObj = new Date(fecha);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fechaObj.toLocaleDateString('es-ES', opciones);
};
</script>

<style scoped>
.info-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
}

.info-card {
    width: calc(33.333% - 10px);
    margin: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
}

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-content {
    padding: 15px;
    background-color: white;
}

.card-content h2 {
    font-size: 18px;
    color: #333;
    margin-top: 0;
}

.card-content p {
    font-size: 14px;
    color: #666;
}

.card-date {
    font-size: 12px;
    color: #888;
    margin-top: 10px;
}
</style>
