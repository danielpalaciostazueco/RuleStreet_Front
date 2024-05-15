<script lang="ts">
import { defineComponent,  type PropType } from 'vue';


export default defineComponent({
    props: {
       policia: {
            type: Object as PropType<{ idPolicia: number; idCiudadano : number; rango: string; numeroPlaca: string }>,
            required: true
        }
    }
});


</script>

<template>
    <div class="tarjeta">
        <div>
            <h3>{{ policia.idPolicia }}</h3>
            <p>Rango: {{ policia.rango }}</p>
            <p>Número de Placa: {{ policia.numeroPlaca}}</p>       
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
