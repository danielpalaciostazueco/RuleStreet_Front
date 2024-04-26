<script lang="ts">
import { defineComponent } from 'vue';
import ReturnButton from '@/components/ComponentesGenerales/BotonPaginaPrincipalComponente.vue';
import MensajeCiudadano from '@/components/BusquedaCiudadano/CiudadanoPerfilMensajeComponente.vue';
import PerfilUsuario from '@/components/BusquedaCiudadano/CiudadanoPerfilInfoComponente.vue';
import BotonesCiudadano from '@/components/BusquedaCiudadano/CiudadanoPerfilBotonesComponente.vue';
import InformacionAdicional from '@/components/BusquedaCiudadano/CiudadanoPerfilInfoAdicionalComponente.vue';
export default defineComponent({
    components: {
        ReturnButton,
        MensajeCiudadano,
        PerfilUsuario,
        BotonesCiudadano,
        InformacionAdicional
    }
});
</script>

<template>
    <div class="ciudadano_menu_derecha">
        <div class="ciudadano_menu_derecha_titulo">
            <h2>PERFIL DEL CIUDADANO</h2>
        </div>
        <div class="ciudadano_perfil">
            <MensajeCiudadano />
            <PerfilUsuario />
            <BotonesCiudadano />
            <InformacionAdicional />
            <return-button />
        </div>
    </div>
</template>

<style>
.ciudadano_menu_derecha {
    background-color: var(--colorFondoCiudadano2);
    width: 75%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
}

.ciudadano_menu_derecha_titulo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ciudadano_menu_derecha_titulo h2 {
    background-color: var(--colorFondoCiudadano);
    border-radius: 0.7rem;
    height: 2.5rem;
    color: var(--colorTextoTarjeta);
    display: flex;
    align-items: center;
    width: 80%;
    display: flex;
    justify-content: center;
}

.ciudadano_perfil {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.ciudadano_perfil p {
    color: var(--colorTextoTarjeta);
    font-size: 2.5rem;
}
</style>
