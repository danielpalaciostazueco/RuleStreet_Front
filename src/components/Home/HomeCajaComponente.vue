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
  @apply flex-[0_0_15rem] h-40 flex flex-col gap-4 bg-[color:var(--colorFondoTarjeta)] w-60 justify-center items-center overflow-hidden no-underline rounded-[10%] scale-100 hover:cursor-pointer hover:bg-[color:var(--colorFondoTarjetaSelecionado)] hover:shadow-[0_0_10px_var(--colorFondoTarjetaSelecionado)] hover:scale-105;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.home_caja:hover .home_icono {
  @apply w-full h-3/6 scale-[1.2];
}
.home_caja:hover p {
  @apply opacity-0 transition-opacity duration-[0.3s] ease-[ease];
}
.home_icono {
  @apply w-20 h-16 fill-[var(--colorSvg)];
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}
.home_caja p {
  @apply text-[color:var(--colorTextoTarjeta)] transition-opacity duration-[0.3s] ease-[ease] m-0;
}

</style>