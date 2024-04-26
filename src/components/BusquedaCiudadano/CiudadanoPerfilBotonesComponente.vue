<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
    <div class="ciudadano_perfil_botones">
        <div class="ciudadano_perfil_botones_izquierda">
            <h2>EN BUSQUEDA Y CAPTURA</h2>
            <div class="ciudadano_perfil_boton">
                <input type="radio" id="no_izquierda" name="response_izquierda" checked>
                <label for="no_izquierda">No</label>
                <input type="radio" id="yes_izquierda" name="response_izquierda">
                <label for="yes_izquierda">Sí</label>
            </div>
        </div>
        <div class="ciudadano_perfil_botones_derecha">
            <h2>EN BUSQUEDA Y CAPTURA</h2>
            <div class="ciudadano_perfil_boton">
                <input type="radio" id="no_derecha" name="response_derecha" checked>
                <label for="no_derecha">No</label>
                <input type="radio" id="yes_derecha" name="response_derecha">
                <label for="yes_derecha">Sí</label>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ciudadano_perfil_botones {
    display: flex;
    gap: 2rem;
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    width: 100%;
    height: 8rem;
    border-radius: 0.7rem;
    justify-content: center;
    align-items: center;
}

.ciudadano_perfil_boton input[type="radio"] {
    display: none;
}

.ciudadano_perfil_boton label {
    display: inline-block;
    width: 13rem;
    padding: 10px;
    text-align: center;
    color: var(--colorBlanco);
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    cursor: pointer;
    border: 1px solid var(--colorTextoTarjeta);
    color: var(--colorTextoTarjeta)
}

#no_izquierda:checked+label,
#no_derecha:checked+label {
    background-color: var(--colorBusquedaCiudadanoPerfilBoton);
    color: var(--colorTextoTarjeta)
}

#yes_izquierda:checked+label,
#yes_derecha:checked+label {
    background-color: var(--colorBusquedaCiudadanoPerfilBoton);
    color: var(--colorTextoTarjeta)
}

.ciudadano_perfil_botones_derecha {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.ciudadano_perfil_botones_izquierda {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.ciudadano_perfil_botones_derecha h2 {
    color: var(--colorTextoTarjeta);
}

.ciudadano_perfil_botones_izquierda h2 {
    color: var(--colorTextoTarjeta);
}
</style>