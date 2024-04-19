<template>
    <div class="search-box">
      {{ buttonText }}
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  const props = defineProps({
    buttonText: String
  });
  </script>
  
  <style scoped>
  :root{
    --colorFondo: #6E87A1;
  }
  .search-box {
    background-color: var(--colorFondo);
    color: white;
    padding: 10px 20px;
    text-align: center;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
  }
  </style>
  