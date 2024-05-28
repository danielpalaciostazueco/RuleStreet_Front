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
  @apply grid gap-12 justify-items-center;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

@media (min-width: 1024px) {
  .card-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .card-container {
    grid-template-columns: repeat(1, 1fr);
  }
}

.HomeCard {
  @apply w-full h-full;
}
</style>
