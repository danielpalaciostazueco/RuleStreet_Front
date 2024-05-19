<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        policia: {
            type: Object as PropType<{
                idPolicia: number;
                nombre: string;
                apellidos: string;
                rango: { nombre: string };
                photo?: string;
                numeroPlaca: string;
            }>,
            required: true
        }
    },
    setup(props) {
        const router = useRouter();

        const navigateToPolicia = () => {
            router.push({ name: 'busquedaPolicia', params: { id: props.policia.idPolicia } });
        };

        return { navigateToPolicia };
    }
});
</script>

<template>
    <div class="tarjeta" @click="navigateToPolicia">
        <img class="tarjeta_imagen" :src="policia.photo || 'https://via.placeholder.com/150'" alt="Foto del Policía" />
        <div>
            <h3>{{ policia.nombre }} {{ policia.apellidos }}</h3>
            <div class="rango">
                <p>{{ policia.rango.nombre }}</p>
            </div>
            <p>{{ policia.numeroPlaca }}</p>
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
.rango {
  @apply flex items-center;
}
.rango p {
  @apply text-[color:var(--colorBlanco)] bg-[color:var(--colorTarjetaPoliciaRango)] p-1 rounded-[0.4rem];
}


</style>
