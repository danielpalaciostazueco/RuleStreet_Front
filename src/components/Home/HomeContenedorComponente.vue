<script setup lang="ts">
import { defineProps } from 'vue'
import HomeCard from './HomeCajaComponente.vue';

interface Card {
    id: number;
    iconPath: string;
    label: string;
    route: string;
}

const props = defineProps<{
    cards: Card[];
}>();
</script>

<template>
    <div class="card-container">
        <HomeCard v-for="card in cards" :key="card.id" :iconPath="card.iconPath" :label="card.label"
            :cardRoute="card.route" />
    </div>
</template>

<style scoped>
.card-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    justify-items: center;
}
</style>