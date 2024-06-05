<script setup lang="ts">
import GestionPoliciaComponente from '@/components/PoliciaGestion/GestionPoliciaComponente.vue';
</script>

<template>
    <div class="app-background">
        <GestionPoliciaComponente />
    </div>
</template>

<style scoped>
.app-background {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    justify-content: normal;
    background-color: var(--colorFondo);
}
</style>
