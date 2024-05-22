<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        citizen: {
            type: Object as PropType<{
                id: number;
                name: string;
                dni: string;
                imagenUrl?: string;
            }>,
            required: true
        }
    },
    setup(props) {
        const router = useRouter();

        const navigateToCitizen = () => {
            router.push({ name: 'busquedaCiudadano', params: { id: props.citizen.id } });
        };

        return { navigateToCitizen };
    }
});
</script>

<template>
    <div class="tarjeta" @click="navigateToCitizen">
        <img class="tarjeta_imagen" :src="citizen.imagenUrl || 'https://via.placeholder.com/150'"
            alt="Foto del Ciudadano" />
        <div>
            <h3>{{ citizen.name }}</h3>
            <p>DNI: {{ citizen.dni }}</p>
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
