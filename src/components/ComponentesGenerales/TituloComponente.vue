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
.ciudadano_titulo {
  @apply bg-[color:var(--colorFondoCiudadano)] w-4/5 flex justify-center rounded-lg;
}
.ciudadano_titulo h1 {
  @apply text-[color:var(--colorTextoTarjeta)];
}

</style>