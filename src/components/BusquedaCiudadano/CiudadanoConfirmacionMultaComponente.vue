<script lang="ts">
export default {
    name: 'ConfirmModal'
}
</script>

<template>
    <div class="modal-backdrop">
        <div class="modal">
            <p>¿Estás seguro de que quieres eliminar esta multa?</p>
            <div class="modal_botones">
                <button @click="$emit('confirm')">Confirmar</button>
                <button @click="$emit('cancel')">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--colorFondoPantallaModal);
}

.modal {
    background: var(--colorFondoModal);
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    color: var(--colorTextoTarjeta);
}

.modal_botones{
    display: flex;
    width: 100%;
    justify-content: space-around;
}
</style>