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
    display: flex;
    background-color: var(--colorTarjetaBusqueda);
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

.rango {
    display: flex;
    align-items: center;
}

.rango p{
    color: var(--colorBlanco);
    background-color: var(--colorTarjetaPoliciaRango);
    border-radius: 0.4rem;
    padding: 0.25rem 0.25rem;
}
</style>
