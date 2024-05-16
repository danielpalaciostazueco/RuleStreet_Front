<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: String
    }
});
</script>

<template>
    <div class="ciudadano_titulo">
        <h1>{{ title }}</h1>
    </div>
</template>

<style scoped>
.ciudadano_titulo[data-v-4607674b] {
    display: flex;
    width: 80%;
    justify-content: center;
    border-radius: 0.5rem;
    background-color: var(--colorFondoCiudadano);
    height: 2rem;
}
.ciudadano_titulo h1 {
  @apply text-[color:var(--colorTextoTarjeta)];
}

</style>