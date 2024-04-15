<template>
    <button class="button">
      <img :src="imagen" :alt="texto">
      <p>{{ texto }}</p>
    </button>
  </template>
  
<script setup lang="ts">
  import { ref, defineProps } from 'vue';
  type Props = {
    imagen: string;
    texto: string;
  };
  const props = defineProps<Props>();
</script>

<style scoped>
.button{
width: 360px;
height: 213px;
background: #263D59;
border-radius: 38px;
margin: 20px;
margin-top: 20vh;
}
.button p {
font-family: 'Patrick Hand';
font-style: normal;
font-weight: 400;
font-size: 40px;
line-height: 100%;
color: #C0C9D8;
mix-blend-mode: normal;
}
</style>