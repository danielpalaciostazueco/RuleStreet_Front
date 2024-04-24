<script lang="ts">
import { defineComponent } from 'vue';
import ReturnButton from '@/components/ComponentesGenerales/BotonPaginaPrincipalComponente.vue';

export default defineComponent({
    components: {
        ReturnButton
    }
});
</script>

<template>
    <div class="ciudadano_menu_derecha">
        <div class="ciudadano_menu_derecha_titulo">
            <h2>PERFIL DEL CIUDADANO</h2>
        </div>
        <div class="ciudadano_perfil">
            <p>SELECIONA UN CIUDADANO PARA CARGAR LA INFORMACIÓN</p>
            <div class="ciudadano_perfil_usuario">
                <div class="ciudadano_perfil_usuario_izquierda">
                    <img src="https://via.placeholder.com/150" alt="">
                </div>
                <div class="ciudadano_perfil_usuario_derecha">
                    <div class="ciudadano_tarjeta">
                        <p>Nombre</p>
                        <p>Diego</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Apellidos</p>
                        <p>Gimenez</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Genero</p>
                        <p>Male</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Nacionalidad</p>
                        <p>Española</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Fecha de nacimiento</p>
                        <p>17/08/2003</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>ID</p>
                        <p>1</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Numero de telefono</p>
                        <p>601221242</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Numero de cuenta</p>
                        <p>432432322432</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Trabajo</p>
                        <p>Desempleado</p>
                    </div>
                </div>
            </div>
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
            <div class="ciudadano_perfil_otros">
                <div class="ciudadano_perfil_notas">
                    notas
                </div>
                <div>
                    multas
                </div>
                <div>
                    denuncias
                </div>
                <div>
                    vehiculos
                </div>
            </div>
            <return-button />
        </div>
    </div>
</template>

<style>
.ciudadano_menu_izquierda_contenedor {
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    height: 100%;
    overflow-y: auto;
    align-items: center;
}

.ciudadano_menu_izquierda_contenedor p {
    color: var(--colorTextoTarjeta);
}

.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar {
    width: 8px;
}

.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar-track {
    background-color: var(--colorFondoCiudadano2);
}

.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar-thumb {
    background-color: var(--colorBlanco);
    border-radius: 4px;
}

.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar-thumb:hover {
    background-color: var(--colorFondoCiudadano);
}

.ciudadano_perfil_usuario {
    display: flex;
    width: 100%;
    gap: 3rem;
}

.ciudadano_perfil_usuario_izquierda {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ciudadano_perfil_usuario_izquierda img {
    width: 15rem;
    height: 15rem;
}

.ciudadano_perfil_usuario_derecha {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.ciudadano_tarjeta {
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    border-radius: 0.7rem;
    width: 12rem;
    height: 4rem;
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    justify-content: center;
    gap: 0.5rem;
}

.ciudadano_tarjeta p {
    font-size: 16px;
}

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

.ciudadano_perfil_otros {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.ciudadano_perfil_notas {
    display: flex;
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    border-radius: 0.7rem;
    width: 100%;
    height: 20rem;
}
</style>
