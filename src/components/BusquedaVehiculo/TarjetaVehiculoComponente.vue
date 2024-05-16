<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { useRouter } from 'vue-router';


export default defineComponent({
    props: {
        vehicle: {
            type: Object as PropType<{
                idVehiculo: number;
                matricula: string;
                modelo: string;
                marca: string;
                Photo: string;
                color: string;

            }>,
            required: true
        }
    },


    setup(props) {
        const router = useRouter();

        const navigateToVehicle = () => {
            router.push({ name: 'busquedaVehiculo', params: { id: props.vehicle.idVehiculo } });
        };

        return { navigateToVehicle };
    }
});
</script>

<template>
    <div class="tarjeta" @click="navigateToVehicle">
        <img class="tarjeta_imagen" :src="vehicle.Photo" alt="Foto del Vehiculo" />
        <div>
            <p>{{ vehicle.marca }} {{ vehicle.modelo }} - {{ vehicle.matricula }}</p>
            <p>{{ vehicle.ciudadano.nombre }} </p>
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