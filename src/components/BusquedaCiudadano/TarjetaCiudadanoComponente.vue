<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    props: {
        citizen: {
            type: Object as PropType<{
                id: number;
                name: string;
                dni: string;
                photo?: string;
            }>,
            required: true
        }
    },
    methods: {
        emitSelectCitizen() {
            this.$emit('select-citizen', this.citizen.id);
            console.log(this.citizen.id)
            //cuando funcione el evento quitar esto
            window.localStorage.setItem('id', this.citizen.id.toString());
        }
    }
});
</script>

<template>
    <div class="tarjeta" @click="emitSelectCitizen">
        <!-- poner foto en el back -->
        <img class="tarjeta_imagen" :src="citizen.photo || 'https://via.placeholder.com/150'"
            alt="Foto del Ciudadano" />
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
