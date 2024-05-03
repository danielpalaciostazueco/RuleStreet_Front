<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    props: {
        policia: {
            type: Object as PropType<{ idPolicia: number; idCiudadano: number; rango: string; numeroPlaca: string }>,
            required: true
        }
    }
});
</script>

<template>
    <div class="tarjeta">
        <div>
            <h3>{{ policia.idPolicia }}</h3>
            <p>Rango: {{ policia.rango }}</p>
            <p>Número de Placa: {{ policia.numeroPlaca }}</p>
        </div>
    </div>
</template>


<style scoped>
.tarjeta {
    display: flex;
    background-color: var(--colorBlanco);
    width: 100%;
    height: 5rem;
    align-items: center;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    gap: 0.5rem;
}

.tarjeta p {
    color: black;
}

.tarjeta_imagen {
    width: 4rem;
    height: 4rem;
    border-radius: 0.5rem;
}
</style>
