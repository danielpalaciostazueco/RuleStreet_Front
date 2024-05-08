<template>
    <div class="info-container">
        <div class="info-card" v-for="card in cards" :key="card.id">
            <img :src="card.imageUrl" :alt="card.title" class="card-image">
            <div class="card-content">
                <h2>{{ card.title }}</h2>
                <p>{{ card.description }}</p>
                <ul v-if="card.details && card.details.length">
                    <li v-for="detail in card.details" :key="detail">{{ detail }}</li>
                </ul>
                <div v-if="card.date" class="card-date">
                    Fecha límite: {{ card.date }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const cards = ref([
    { id: 1, imageUrl: 'https://example.com/image1.jpg', title: 'Recogida separada de materia orgánica', description: 'Basura orgánica en el contenedor marrón. Dinamizaciones y charlas informativas en los barrios.', details: ['Hasta el 2 de julio'], date: '2024-07-02' },
    { id: 2, imageUrl: 'https://example.com/image2.jpg', title: 'Escuela Municipal de Música y Danza', description: 'Preinscripciones curso 2024-25.', date: '2024-05-12' },
    { id: 3, imageUrl: 'https://example.com/image3.jpg', title: 'Consejo de ciudad', description: 'Pleno Ordinario. Seguir en directo.', date: '2024-05-16' },
    { id: 4, imageUrl: 'https://example.com/image4.jpg', title: 'Escuelas Infantiles Municipales', description: 'Matrícula abierta del 9 al 17 de mayo.', date: '2024-05-17' }
]);
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
