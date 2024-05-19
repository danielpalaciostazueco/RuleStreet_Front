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
    @apply flex bg-[color:var(--colorBlanco)] w-full h-20 items-center gap-2 px-2;
}

.tarjeta p {
    @apply text-[black];
}

.tarjeta_imagen {
    @apply w-16 h-16 rounded-lg;
}
</style>