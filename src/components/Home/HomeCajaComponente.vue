<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';

defineProps({
  iconPath: String,
  label: String,
  cardRoute: String
})
</script>

<template>
  <router-link :to="cardRoute || '/'" class="home_caja">
    <svg class="home_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path :d="iconPath" />
    </svg>
    <p>{{ label }}</p>
  </router-link>
</template>


<style scoped>
.home_caja {
  flex: 0 0 15rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--colorFondoTarjeta);
  width: 15rem;
  border-radius: 10%;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: scale(1);
  overflow: hidden;
}

.home_caja:hover {
  transform: scale(1.05);
  cursor: pointer;
  background-color: var(--colorFondoTarjetaSelecionado);
  box-shadow: 0 0 10px var(--colorFondoTarjetaSelecionado);
}

.home_caja:hover .home_icono {
  transform: scale(1.2);
  width: 100%;
  height: 50%;
}

.home_caja:hover p {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.home_icono {
  width: 5rem;
  height: 4rem;
  fill: var(--colorSvg);
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}

.home_caja p {
  color: var(--colorTextoTarjeta);
  transition: opacity 0.3s ease;
  margin: 0;
}
</style>