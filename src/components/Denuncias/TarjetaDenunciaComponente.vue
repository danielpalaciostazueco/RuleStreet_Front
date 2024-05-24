<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        denuncia: {
            type: Object as PropType<{
                id: number;
                titulo: string;
            }>,
            required: true
        }
    },
    setup(props) {
        const router = useRouter();

        const navigateToDenuncia = () => {
            router.push({ name: 'denuncias', params: { id: props.denuncia.id } });
        };

        return { navigateToDenuncia };
    }
});
</script>

<template>
    <div class="tarjeta" @click="navigateToDenuncia">
        <div>
            <h3>{{ denuncia.titulo }}</h3>
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
