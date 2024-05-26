<template>
    <div>
        <button @click="idiomaCambiado" class="ciudadano_boton">{{ idiomaActual }}</button>

    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const idiomaActual = computed(() => locale.value === 'en' ? 'Español' : 'English');
const idiomaCambiado = () => {
    locale.value = locale.value === 'en' ? 'es' : 'en';
}
</script>

<style scoped>
.ciudadano_boton {
    @apply flex h-8 w-20 items-center justify-center bg-[#0068f7] text-[color:var(--colorTextoTarjeta)] no-underline mt-5;
}
</style>