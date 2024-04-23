<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    props: {
        citizen: {
            type: Object as PropType<{ id: number; name: string; dni: string; photo: string }>,
            required: true
        }
    }
});
</script>

<template>
    <div class="tarjeta">
        <img class="tarjeta_imagen" :src="citizen.photo" alt="Foto del Ciudadano" />
        <div>
            <h3>{{ citizen.name }}</h3>
            <p>DNI: {{ citizen.dni }}</p>
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
