<script setup lang="ts">
import { ref } from 'vue';

import { useRouter } from 'vue-router';
import { useListadoAuth } from '@/stores/storeAuth';

const store = useListadoAuth();
const NombreUsuario = ref('');
const Contraseña = ref('');
const router = useRouter();


const submitForm = async () => {
    try {
        await store.LoginPolicia();
    } catch (error) {
        console.error('Error al enviar formulario:', error);
    }
};
</script>
<template>
    <div class="register_container">
        <form @submit.prevent="submitForm" class="register_formulario">
            <h2>Iniciar sesión</h2>
            <input type="text" v-model="store.DatosPolicia.numeroPlaca" placeholder="Número de placa">

            <input type="password" v-model="store.DatosPolicia.contrasena" placeholder="Contraseña">
            <button type="submit">Enviar</button>
            <p>¿Eres un ciudadano? <RouterLink to="/login">Ir al login</RouterLink>
            </p>
        </form>
    </div>
</template>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

:root {
    --header_footer: #13202c;
    --fondo: #0d263d;
    --blanco: #fff;
    --botonActivo: #226aac;
    --boton: #0d263d;
    --botonTransparente: rgba(13, 38, 61, 0.7);
    --titulo: #3198f7;
    --menuDashboard: #3f3f3f;
    --menuDashboardselecion: #757575;
    --bordeInput: #007bff;
    --sombraBordeInput: rgba(0, 123, 255, 0.5);
    --bordeTarjetaSala: #E0E0E0;
}

/* Cabecera */

.header {
    display: flex;
    background-color: var(--header_footer);
    height: 5rem;
}

.header_izq {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--blanco);
}

.header_izq img {
    width: 4rem;
    height: 4rem;
}

.header_dcha {
    width: 70%;
    display: flex;
    align-items: center;
}

.header_dcha nav {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    align-items: center;
}

.header_dcha nav a {
    color: var(--blanco);
    text-decoration: none;
}

.header_dcha nav a:hover {
    text-decoration: underline;
    color: var(--botonActivo);
}

.header_boton {
    background-color: var(--boton);
    color: var(--blanco);
    border-color: var(--blanco);
    border-width: 1px;
    border-style: solid;
    width: 10rem;
    height: 2rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}

.header_boton:hover {
    background-color: var(--botonActivo);
    border: 0;
}

@media(max-width: 1000px) {
    .header_izq {
        width: 20%;
    }

    .header_dcha {
        width: 80%;
    }
}

@media(max-width: 700px) {
    .header {
        flex-direction: column;
        height: auto;
        gap: 2rem;
        padding: 2rem;
    }

    .header_izq {
        width: auto;
    }

    .header_dcha {
        width: auto;
    }
}

@media(max-width: 600px) {

    .header_dcha {
        justify-content: center;
    }

    .header_dcha nav {
        width: auto;
        flex-direction: column;
        gap: 2rem;
    }
}

/* Footer */

.home_footer {
    display: flex;
    flex-direction: column;
    background-color: var(--header_footer);
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
    align-items: center;
}

.home_footer_izq {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--blanco);
}

.home_footer_izq img {
    width: 4rem;
    height: 4rem;
}

.home_footer_izq_div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

.home_footer_izq_div_iconos {
    display: flex;
    gap: 1rem;
}

.home_footer_izq_iconos {
    width: 2rem;
    height: 2rem;
    fill: var(--blanco);
}

.home_footer_dcha {
    width: 70%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.home_footer_dcha_div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 2rem;
}

.home_footer_dcha_div2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: var(--blanco);
}

.home_footer_dcha_div_texto nav {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

.home_footer_dcha_div_texto nav a {
    text-decoration: none;
    color: var(--blanco);
}

.home_footer_dcha_div_texto nav a:hover {
    text-decoration: underline;
    color: var(--botonActivo);
}

@media screen and (min-width: 700px) {
    .home_footer {
        display: flex;
        height: 8rem;
        flex-direction: row;
        height: auto;
        align-items: center;
    }

    .home_footer_dcha_div {
        flex-direction: row;
        gap: 2rem;
    }
}

/*Home*/

.home_container {
    padding: 2rem;
    background-color: var(--fondo);
    min-height: 100vh;
}

.home_slider-container {
    position: relative;
    width: 80%;
    margin: 50px auto;
    overflow: hidden;
}

.home_slider {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.home_slide {
    min-width: 100%;
    height: 12rem;
    box-sizing: border-box;
}

.home_slide img {
    width: 100%;
    object-fit: cover;
}

.home_prev-button,
.home_next-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    fill: var(--blanco);
    padding: 10px;
    cursor: pointer;
    width: 2rem;
    height: 2.5rem;
}

.home_prev-button {
    left: 10px;
}

.home_next-button {
    right: 10px;
}

.home_cartelera {
    color: var(--blanco);
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.home_cartelera_div_boton {
    display: flex;
    justify-content: flex-end;
    margin-right: 4rem;
}

.home_cartelera_boton1 {
    background-color: var(--boton);
    color: var(--blanco);
    border-color: var(--blanco);
    border-width: 1px;
    border-style: solid;
    width: 13rem;
    height: 2.5rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}

.home_cartelera_boton1:hover {
    background-color: var(--botonActivo);
    border: 0;
}

.home_cartelera_div {
    display: flex;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    align-items: center;
}

.home_cartelera_div_img {
    display: flex;
    flex-direction: column;
}

.home_cartelera_div_img img {
    width: 16rem;
    height: 25rem;
}

.home_cartelera_div_img button {
    position: relative;
    bottom: 5rem;
    left: 1.5rem;
    background-color: var(--botonTransparente);
}

@media(max-width: 1200px) {
    .home_cartelera_div {
        flex-direction: column;
    }

    .home_cartelera_div_boton {
        justify-content: center;
        margin-right: 0rem;
    }

}

/*cartelera*/

.cartelera_section {
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    padding: 2rem;
    gap: 1rem;
    justify-content: flex-start;
    background-color: var(--fondo);
}

.cartelera_boton1 {
    background-color: var(--boton);
    color: var(--blanco);
    border-color: var(--blanco);
    border-width: 1px;
    border-style: solid;
    width: 13rem;
    height: 2.5rem;
    cursor: pointer;
}

.cartelera_boton1:hover {
    background-color: var(--botonActivo);
    border: 0;
}

.cartelera_div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.cartelera_div_img {
    width: calc(25% - 1rem);
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.cartelera_div_img img {
    width: 16rem;
    height: 25rem;
}

.cartelera_div_img button {
    position: relative;
    bottom: 5rem;
    background-color: var(--botonTransparente);
}

@media(max-width: 1200px) {
    .cartelera_div_img {
        width: calc(50% - 1rem);
    }
}

@media(max-width: 700px) {
    .cartelera_div_img {
        width: calc(100% - 1rem);
    }

    .cartelera_section {
        padding: 2rem;
        justify-content: center;
    }
}

/*detalle obras*/

.infoObras_sectionContainer {
    min-height: 100vh;
    justify-content: center;
    display: flex;
    background-color: var(--fondo);
    color: var(--blanco);
    flex-direction: column;
}

.infoObras_section_div {
    display: flex;
    padding: 2rem 0rem 2rem 0rem;
    align-items: center;
}

.infoObras_section_izq {
    width: 33.3%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.infoObras_section_izq img {
    width: 16rem;
    height: 25rem;
}

.infoObras_section_central {
    width: 33.3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
}

.infoObras_section_central h2 {
    color: var(--titulo);
    font-size: 40px;
}

.infoObras_section_dcha {
    width: 33.3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
}

.infoObras_section_dcha_div1,
.infoObras_section_dcha_div2 {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    align-items: center;
}

.infoObras_section_boton {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0rem 2rem 0rem;
}

.infoObras_section_boton button {
    background-color: var(--botonTransparente);
    color: var(--blanco);
    border-color: var(--blanco);
    border-width: 1px;
    border-style: solid;
    width: 13rem;
    height: 2.5rem;
    cursor: pointer;
}

.infoObras_section_boton button:hover {
    background-color: var(--botonActivo);
    border: 0;
}

@media(max-width: 1000px) {
    .infoObras_section_div {
        flex-direction: column;
        gap: 2rem;
    }

    .infoObras_section_boton {
        padding-top: 0rem;
    }

    .infoObras_section_central {
        text-align: center;
        width: 50%;
    }
}

/* 404 */
.notFound_sectionContainer {
    min-height: 100vh;
    justify-content: center;
    display: flex;
    background-color: var(--fondo);
    color: var(--blanco);
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.notFound_sectionContainer p {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
}

.notFound_sectionContainer h1 {
    display: flex;
    justify-content: center;
    font-size: 5rem;
}

.notFound_img {
    width: 12rem;
    height: 12rem;
}

/*eleccion sala*/

.eleccionSala_container {
    min-height: 100vh;
    justify-content: center;
    display: flex;
    flex-direction: column;
    background-color: var(--fondo);
    color: var(--blanco);
    align-items: center;
    gap: 2rem;
    padding: 2rem;
}

.eleccionSala_container button {
    background-color: var(--boton);
    color: var(--blanco);
    border-color: var(--blanco);
    border-width: 1px;
    border-style: solid;
    width: 13rem;
    height: 2.5rem;
    cursor: pointer;
}

.eleccionSala_container button:hover {
    background-color: var(--botonActivo);
    border: none;
}

.eleccionSala_container_div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    padding: 10px;
    gap: 2rem;
}

.eleccionSala_container_div img {
    width: 20rem;
    height: 30rem;
}

.eleccionSala_texto {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 1rem;
}

.eleccionSala_container_div_divizq {
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: center;
}

.eleccionSala_container_div_divdcha {
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: 2rem;
    justify-content: center;
}

.eleccionSala_container_div_divdcha h2 {
    color: var(--titulo);
}

.eleccionSala_div2 {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    gap: 2rem;
    align-items: center;
}

.eleccionSala_div2 div {
    display: flex;
    gap: 2rem;
    align-items: center;
    width: 50%;
    justify-content: space-around;
}

@media(max-width: 1000px) {
    .eleccionSala_div2 div {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        border: 2px solid var(--bordeTarjetaSala);
        padding: 15px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        background-color: var(--fondo);
        color: var(--blanco);
    }

    .eleccionSala_texto {
        text-align: center;
    }
}

@media(max-width: 500px) {
    .eleccionSala_container button {
        width: 7rem
    }
}

/*dashboard*/

.dashboard_container {
    min-height: 100vh;
    display: flex;
    background-color: var(--fondo);
    color: var(--blanco);
    gap: 2rem;
}

.dashboard_menu_izquierda {
    width: 20%;
    background-color: var(--menuDashboard);
    display: flex;
    flex-direction: column;
    text-indent: 2rem;
}

.dashboard_menu_izquierda p {
    height: 6rem;
    display: flex;
    align-items: center;
}

.dashboard_menu_izquierda p:hover {
    background-color: var(--menuDashboardselecion);
    cursor: pointer;
}

.dashboard_menu_derecha {
    width: 80%;
    padding: 2rem;
}

.dashboard_div_separacion {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.dashboard_contenido_funciones {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    align-items: center;
}

.dashboard_contenido_obras {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr 1fr 0.5fr 0.5fr;
    gap: 1rem;
    align-items: center;
}

.dashboard_contenido_usuarios {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    align-items: center;
}

.dashboard_contenido_actores {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    align-items: center;
}

.dashboard_item {
    display: contents;
    text-align: center;
}

.dashboard_contenido_tabla {
    padding-left: 30%;
}

.dashboard_iconos {
    display: flex;
    gap: 2rem;
}

.dashboard_iconos svg {
    height: 2rem;
    fill: var(--blanco);
}

.dashboard_iconos svg:hover {
    fill: var(--botonActivo);
}

.dashboard_put {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
}

.dashboard_menu_container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.dashboard_put input {
    width: 10rem;
    height: 2rem;
    border: 1px solid var(--blanco);
    border-radius: 5px;
    padding: 8px;
    font-size: 16px;
    background-color: var(--boton);
    padding: 10px;
    font-size: 16px;
    outline: none;
    color: var(--blanco);
}

.dashboard_put input:focus {
    border-color: var(--bordeInput);
    box-shadow: 0 0 5px var(--sombraBordeInput);
}

.dashboard_put textarea {
    width: 20rem;
    height: 20rem;
    border: 1px solid var(--blanco);
    border-radius: 5px;
    padding: 8px;
    font-size: 16px;
    background-color: var(--boton);
    padding: 10px;
    font-size: 16px;
    outline: none;
    color: var(--blanco);
}

.dashboard_botones {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
}

.dashboard_put_actores {
    display: flex;
    gap: 2rem;
}

.dashboard_put_actores button,
.dashboard_botones button {
    background-color: var(--boton);
    color: var(--blanco);
    border-color: var(--blanco);
    border-width: 1px;
    border-style: solid;
    width: 10rem;
    height: 2rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}

.dashboard_put_actores button:hover,
.dashboard_botones button:hover {
    background-color: var(--botonActivo);
    border: none;
}

.dashboard_encabezado {
    font-weight: bold;
    text-align: center;
}

.dashboard_boton {
    background-color: var(--botonTransparente);
    color: var(--blanco);
    border-color: var(--blanco);
    border-width: 1px;
    border-style: solid;
    width: 13rem;
    height: 2.5rem;
    cursor: pointer;
}

.dashboard_boton:hover {
    background-color: var(--botonActivo);
    border: none;
}

@media (max-width: 768px) {
    .dashboard_menu_izquierda {
        width: 100%;
        height: auto;
    }

    .dashboard_menu_derecha {
        width: 100%;
        padding: 1rem;
    }

    .dashboard_contenido_funciones,
    .dashboard_contenido_obras,
    .dashboard_contenido_usuarios,
    .dashboard_contenido_actores {
        grid-template-columns: 1fr;
    }

    .dashboard_encabezado {
        display: none;
    }

    .dashboard_boton {
        width: 8rem;
        align-items: center;
    }

    .dashboard_put_actores {
        display: flex;
        flex-direction: column;
    }

    .dashboard_put textarea {
        width: 9rem;
    }

    .dashboard_contenido_funciones>.dashboard_item:not(:last-child)::after {
        content: "";
        display: block;
        height: 1px;
        width: calc(100% - 30px);
        background: var(--bordeTarjetaSala);
        margin: 10px 15px;
    }

    .dashboard_contenido_obras>.dashboard_item:not(:last-child)::after {
        content: "";
        display: block;
        height: 1px;
        width: calc(100% - 30px);
        background: var(--bordeTarjetaSala);
        margin: 10px 15px;
    }

    .dashboard_contenido_usuarios>.dashboard_item:not(:last-child)::after {
        content: "";
        display: block;
        height: 1px;
        width: calc(100% - 30px);
        background: var(--bordeTarjetaSala);
        margin: 10px 15px;
    }

    .dashboard_contenido_actores>.dashboard_item:not(:last-child)::after {
        content: "";
        display: block;
        height: 1px;
        width: calc(100% - 30px);
        background: var(--bordeTarjetaSala);
        margin: 10px 15px;
    }
}

/*register*/

.register_container {
    min-height: 100vh;
    justify-content: center;
    display: flex;
    background-color: var(--fondo);
    color: var(--blanco);
    align-items: center;
    gap: 2rem;
    padding: 2rem;
}

.register_formulario {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 30rem;
    justify-content: center;
    align-items: center;
    width: 40rem;
}

.register_formulario input {
    width: 15rem;
    height: 1.7rem;
    display: flex;
    background-color: var(--fondo);
    border: none;
    color: var(--blanco);
    outline: none;
    border-bottom: 2px solid var(--blanco);
}

.register_formulario input::placeholder {
    color: var(--blanco);
    opacity: 0.2;
}

.register_formulario button {
    background-color: var(--boton);
    color: var(--blanco);
    border-color: var(--blanco);
    border-width: 1px;
    border-style: solid;
    width: 13rem;
    height: 2.5rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}

.register_formulario button:hover {
    background-color: var(--botonActivo);
    border: 0;
}

.register_formulario a,
.register_cuenta {
    color: var(--blanco);
    text-decoration: none;
}

.register_formulario a:hover,
.register_cuenta:hover {
    color: var(--botonActivo);
    text-decoration: underline;
}

/*sala*/

.sala_container {
    min-height: 100vh;
    justify-content: center;
    display: flex;
    flex-direction: column;
    background-color: var(--fondo);
    color: var(--blanco);
    align-items: center;
    gap: 2rem;
    padding: 2rem;
}

.sala_container h2 {
    color: var(--titulo);
}

.sala_svg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30rem;
}

.sala_pantalla {
    width: 35rem;
    height: 5rem;
}

.sala_boton {
    background-color: var(--boton);
    color: var(--blanco);
    border-color: var(--blanco);
    border-width: 1px;
    border-style: solid;
    width: 13rem;
    height: 2.5rem;
    cursor: pointer;
}

.sala_boton:hover {
    background-color: var(--botonActivo);
    border: 0;
}

.sala_div {
    display: flex;
    flex-direction: row;
    gap: 2rem;
}

.infoPago_Container {
    justify-content: center;
    display: flex;
    padding: 2rem;
    background-color: var(--fondo);
    color: var(--blanco);
}

.infoPago_div1_divIzq {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.infoPago_div1_divIzq h2 {
    color: var(--titulo);
}

.infoPago_div1_divIzq_div {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.infoPago_div1_divIzq_div div {
    display: flex;
    gap: 1rem;
    flex-direction: column;
}

.infoPago_div1_divDcha h2 {
    color: var(--titulo);
}

.infoPago_div1_divDcha_input {
    height: 2rem;
    width: 15rem;
    border-radius: 20px;
    padding-left: 1rem;
    border: 1px solid var(--blanco);
}

.infoPago_div1_divDcha {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.infoPago_div1_divDcha_div {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.infoPago_div1_divDcha_checks {
    margin: 0.5rem;
}

.infoPago_tarjeta {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    margin: auto;
    gap: 1rem;
}

.infoPago_tarjeta label {
    margin-top: 10px;
}

.infoPago_tarjeta input {
    margin-bottom: 10px;
    border: 1px solid var(--blanco);
    border-radius: 5px;
    height: 2rem;
    width: 15rem;
    border-radius: 20px;
    padding-left: 1rem;
}

.infoPago_caducidadContainer {
    display: flex;
    margin-bottom: 10px;
    gap: 2rem;
}

.infoPago_caducidadContainer input {
    width: 5.5rem;
    margin-right: 5px;
}

.infoPago_boton {
    background-color: var(--boton);
    color: var(--blanco);
    border-color: var(--blanco);
    border-width: 1px;
    border-style: solid;
    width: 13rem;
    height: 2.5rem;
    cursor: pointer;
}

.infoPago_boton:hover {
    background-color: var(--botonActivo);
    border: 0;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: var(--boton);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
}

.close-modal {
    float: right;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
}

.sala_leyenda {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
}

.sala_leyenda div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
    width: 100%;
}

.sala_leyenda span {
    margin-left: 0.5rem;
}

.sala_pantalla {
    width: 30rem;
}

@media(max-width: 1200px) {
    .sala_leyenda {
        width: 80%;
    }
}

@media(max-width: 1000px) {
    .sala_leyenda {
        width: 100%;
    }


    .sala_svg {
        width: 20rem;
    }

    .sala_pantalla {
        width: 25rem;
        height: 5rem;
    }
}

@media(max-width: 600px) {
    .sala_svg {
        width: 20rem;
    }

    .sala_pantalla {
        width: 20rem;
        height: 5rem;
    }

    .sala_leyenda {
        flex-direction: column;
        gap: 2rem;
    }

    .sala_leyenda div {
        padding-left: 30%;
        justify-content: start;
    }

    .sala_boton {
        width: 10rem;
    }
}

/*pagina del usuario*/

.usuario_container {
    min-height: 100vh;
    justify-content: center;
    display: flex;
    flex-direction: column;
    background-color: var(--fondo);
    color: var(--blanco);
    align-items: center;
    gap: 2rem;
    padding: 2rem;
}

.usuario_boton {
    background-color: var(--boton);
    color: var(--blanco);
    border-color: var(--blanco);
    border-width: 1px;
    border-style: solid;
    width: 10rem;
    height: 2rem;
    cursor: pointer;
    align-items: center;
    text-decoration: none;
    margin: 1rem;
}

.usuario_boton:hover {
    background-color: var(--botonActivo);
    border: 0;
}
</style>
