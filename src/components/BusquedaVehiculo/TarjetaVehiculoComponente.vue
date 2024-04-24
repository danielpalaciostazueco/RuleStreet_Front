<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    props: {
        vehicle: {
            type: Object as PropType<{ id: number; Matricula: string; Modelo: string; Color: string; IdCiudadano: number, Photo: string  }>,
            required: true
        }
    }
});
</script>

<template>
    <div class="tarjeta">
        <img class="tarjeta_imagen" :src="vehicle.Photo" alt="Foto del Vehiculo" />
        <div>
            <h3>{{ vehicle.id }}</h3>
            <p>Modelo: {{ vehicle.Modelo }}</p>
            <p>Matrícula: {{ vehicle.Matricula }}</p>       
        </div>
    </div>
</template>


<style scoped>
.tarjeta{
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
