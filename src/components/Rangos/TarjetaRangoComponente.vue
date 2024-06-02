<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        range: {
            type: Object as PropType<{
                id: number;
                name: string;
            }>,
            required: true
        }
    },
    setup(props) {
        const router = useRouter();

        const navigateToRange = () => {
            router.push({ name: 'rangos', params: { id: props.range.id } });
        };

        return { navigateToRange };
    }
});
</script>

<template>
    <div class="tarjeta" @click="navigateToRange">
        <div>
            <h3>{{ range.name }}</h3>
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
