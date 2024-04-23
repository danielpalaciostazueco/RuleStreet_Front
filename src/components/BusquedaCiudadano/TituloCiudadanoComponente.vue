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

<style>
.ciudadano_titulo {
    background-color: var(--colorFondoCiudadano);
    width: 80%;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
}

.ciudadano_titulo h1 {
    color: var(--colorTextoTarjeta);
}
</style>