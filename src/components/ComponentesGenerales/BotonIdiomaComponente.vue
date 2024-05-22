<template>
    <div>
        <button @click="idiomaCambiado" class="nav__link language-toggle">{{ idiomaActual }}</button>

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

<style scoped></style>