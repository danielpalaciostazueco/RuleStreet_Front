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
        await store.LoginAyuntamiento();
    } catch (error) {
        console.error('Error al enviar formulario:', error);
    }
};
</script>
<template>
    <div class="register_container">
        <form @submit.prevent="submitForm" class="register_formulario">
            <h2>Iniciar sesión</h2>
            <input type="text" v-model="store.DatosAyuntamiento.Dni" placeholder="Dni Completo">
            <input type="password" v-model="store.DatosAyuntamiento.Contrasena" placeholder="Contraseña">
            <button type="submit">Enviar</button>
            <p>
                <RouterLink to="/">Volver a la página principal</RouterLink>
            </p>
        </form>
    </div>
</template>

<style scoped>
* {
  @apply box-border m-0 p-0;
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
  --bordeTarjetaSala: #e0e0e0;
}

/* Cabecera */
.header {
  @apply flex bg-[color:var(--header\_footer)] h-20;
}
.header_izq {
  @apply w-[30%] flex justify-center items-center text-[color:var(--blanco)];
}
.header_izq img {
  @apply w-16 h-16;
}
.header_dcha {
  @apply w-[70%] flex items-center;
}
.header_dcha nav {
  @apply flex justify-evenly w-full items-center;
}
.header_dcha nav a {
  @apply text-[color:var(--blanco)] no-underline hover:underline hover:text-[color:var(--botonActivo)];
}
.header_boton {
  @apply bg-[color:var(--boton)] text-[color:var(--blanco)] border-[color:var(--blanco)] border w-40 h-8 cursor-pointer flex justify-center items-center no-underline border-solid hover:bg-[color:var(--botonActivo)] hover:border-0;
}
@media (max-width: 1000px) {
  .header_izq {
    @apply w-1/5;
  }
  .header_dcha {
    @apply w-4/5;
  }
}
@media (max-width: 700px) {
  .header {
    @apply flex-col h-auto gap-8 p-8;
  }
  .header_izq {
    @apply w-auto;
  }
  .header_dcha {
    @apply w-auto;
  }
}
@media (max-width: 600px) {
  .header_dcha {
    @apply justify-center;
  }
  .header_dcha nav {
    @apply w-auto flex-col gap-8;
  }
}

/* Footer */
.home_footer {
  @apply flex flex-col bg-[color:var(--header\_footer)] gap-8 items-center py-8;
}
.home_footer_izq {
  @apply w-[30%] flex justify-center items-center text-[color:var(--blanco)];
}
.home_footer_izq img {
  @apply w-16 h-16;
}
.home_footer_izq_div {
  @apply flex flex-col gap-4 items-center;
}
.home_footer_izq_div_iconos {
  @apply flex gap-4;
}
.home_footer_izq_iconos {
  @apply w-8 h-8 fill-[var(--blanco)];
}
.home_footer_dcha {
  @apply w-[70%] flex justify-evenly items-center;
}
.home_footer_dcha_div {
  @apply w-full flex flex-col justify-evenly gap-8;
}
.home_footer_dcha_div2 {
  @apply flex flex-col items-center gap-4 text-[color:var(--blanco)];
}
.home_footer_dcha_div_texto nav {
  @apply flex flex-col gap-4 items-center;
}
.home_footer_dcha_div_texto nav a {
  @apply no-underline text-[color:var(--blanco)] hover:underline hover:text-[color:var(--botonActivo)];
}
@media screen and (min-width: 700px) {
  .home_footer {
    @apply flex h-32 flex-row h-auto items-center;
  }
  .home_footer_dcha_div {
    @apply flex-row gap-8;
  }
}

/*Home*/
.home_container {
  @apply bg-[color:var(--fondo)] min-h-screen p-8;
}
.home_slider-container {
  @apply relative w-4/5 overflow-hidden mx-auto my-[50px];
}
.home_slider {
  @apply flex transition-transform duration-[0.5s] ease-[ease-in-out];
}
.home_slide {
  @apply min-w-full h-48 box-border;
}
.home_slide img {
  @apply w-full object-cover;
}
.home_prev-button,
.home_next-button {
  @apply absolute -translate-y-2/4 fill-[var(--blanco)] cursor-pointer w-8 h-10 p-2.5 top-2/4;
}
.home_prev-button {
  @apply left-2.5;
}
.home_next-button {
  @apply right-2.5;
}
.home_cartelera {
  @apply text-[color:var(--blanco)] flex flex-col gap-8;
}
.home_cartelera_div_boton {
  @apply flex justify-end mr-16;
}
.home_cartelera_boton1 {
  @apply bg-[color:var(--boton)] text-[color:var(--blanco)] border-[color:var(--blanco)] border w-52 h-10 cursor-pointer flex justify-center items-center no-underline border-solid hover:bg-[color:var(--botonActivo)] hover:border-0;
}
.home_cartelera_div {
  @apply flex justify-center gap-4 w-full items-center;
}
.home_cartelera_div_img {
  @apply flex flex-col;
}
.home_cartelera_div_img img {
  @apply w-64 h-[25rem];
}
.home_cartelera_div_img button {
  @apply relative bg-[color:var(--botonTransparente)] left-6 bottom-20;
}
@media (max-width: 1200px) {
  .home_cartelera_div {
    @apply flex-col;
  }
  .home_cartelera_div_boton {
    @apply justify-center mr-0;
  }
}

/*cartelera*/
.cartelera_section {
  @apply min-h-screen flex flex-wrap gap-4 justify-start bg-[color:var(--fondo)] p-8;
}
.cartelera_boton1 {
  @apply bg-[color:var(--boton)] text-[color:var(--blanco)] border-[color:var(--blanco)] border w-52 h-10 cursor-pointer border-solid hover:bg-[color:var(--botonActivo)] hover:border-0;
}
.cartelera_div {
  @apply w-full flex flex-wrap gap-4;
}
.cartelera_div_img {
  @apply w-[calc(25%_-_1rem)] flex flex-col items-center justify-center mb-4;
}
.cartelera_div_img img {
  @apply w-64 h-[25rem];
}
.cartelera_div_img button {
  @apply relative bg-[color:var(--botonTransparente)] bottom-20;
}
@media (max-width: 1200px) {
  .cartelera_div_img {
    @apply w-[calc(50%_-_1rem)];
  }
}
@media (max-width: 700px) {
  .cartelera_div_img {
    @apply w-[calc(100%_-_1rem)];
  }
  .cartelera_section {
    @apply justify-center p-8;
  }
}

/*detalle obras*/
.infoObras_sectionContainer {
  @apply min-h-screen justify-center flex bg-[color:var(--fondo)] text-[color:var(--blanco)] flex-col;
}
.infoObras_section_div {
  @apply flex items-center px-0 py-8;
}
.infoObras_section_izq {
  @apply w-[33.3%] flex items-center justify-center;
}
.infoObras_section_izq img {
  @apply w-64 h-[25rem];
}
.infoObras_section_central {
  @apply w-[33.3%] flex flex-col justify-center gap-4;
}
.infoObras_section_central h2 {
  @apply text-[color:var(--titulo)] text-[40px];
}
.infoObras_section_dcha {
  @apply w-[33.3%] flex flex-col justify-center items-center gap-12;
}
.infoObras_section_dcha_div1,
.infoObras_section_dcha_div2 {
  @apply flex flex-col gap-4 w-full items-center;
}
.infoObras_section_boton {
  @apply flex justify-center items-center px-0 py-8;
}
.infoObras_section_boton button {
  @apply bg-[color:var(--botonTransparente)] text-[color:var(--blanco)] border-[color:var(--blanco)] border w-52 h-10 cursor-pointer border-solid hover:bg-[color:var(--botonActivo)] hover:border-0;
}
@media (max-width: 1000px) {
  .infoObras_section_div {
    @apply flex-col gap-8;
  }
  .infoObras_section_boton {
    @apply pt-0;
  }
  .infoObras_section_central {
    @apply text-center w-6/12;
  }
}

/* 404 */
.notFound_sectionContainer {
  @apply min-h-screen justify-center flex bg-[color:var(--fondo)] text-[color:var(--blanco)] flex-col items-center gap-8;
}
.notFound_sectionContainer p {
  @apply w-full flex justify-center text-2xl;
}
.notFound_sectionContainer h1 {
  @apply flex justify-center text-[5rem];
}
.notFound_img {
  @apply w-48 h-48;
}

/*eleccion sala*/
.eleccionSala_container {
  @apply min-h-screen justify-center flex flex-col bg-[color:var(--fondo)] text-[color:var(--blanco)] items-center gap-8 p-8;
}
.eleccionSala_container button {
  @apply bg-[color:var(--boton)] text-[color:var(--blanco)] border-[color:var(--blanco)] border w-52 h-10 cursor-pointer border-solid hover:bg-[color:var(--botonActivo)] hover:border-[none];
}
.eleccionSala_container_div {
  @apply flex flex-col items-center w-6/12 gap-8 p-2.5;
}
.eleccionSala_container_div img {
  @apply w-80 h-[30rem];
}
.eleccionSala_texto {
  @apply flex flex-col w-full items-center gap-4;
}
.eleccionSala_container_div_divizq {
  @apply flex w-6/12 items-center justify-center;
}
.eleccionSala_container_div_divdcha {
  @apply flex flex-col w-6/12 gap-8 justify-center;
}
.eleccionSala_container_div_divdcha h2 {
  @apply text-[color:var(--titulo)];
}
.eleccionSala_div2 {
  @apply flex flex-col w-full justify-center gap-8 items-center;
}
.eleccionSala_div2 div {
  @apply flex gap-8 items-center w-6/12 justify-around;
}
@media (max-width: 1000px) {
  .eleccionSala_div2 div {
    @apply flex flex-col border-[color:var(--bordeTarjetaSala)] shadow-[0px_4px_6px_rgba(0,0,0,0.1)] bg-[color:var(--fondo)] text-[color:var(--blanco)] mb-5 p-[15px] border-2 border-solid;
  }
  .eleccionSala_texto {
    @apply text-center;
  }
}
@media (max-width: 500px) {
  .eleccionSala_container button {
    @apply w-28;
  }
}

/*dashboard*/
.dashboard_container {
  @apply min-h-screen flex bg-[color:var(--fondo)] text-[color:var(--blanco)] gap-8;
}
.dashboard_menu_izquierda {
  @apply w-1/5 bg-[color:var(--menuDashboard)] flex flex-col indent-[2rem];
}
.dashboard_menu_izquierda p {
  @apply h-24 flex items-center hover:bg-[color:var(--menuDashboardselecion)] hover:cursor-pointer;
}
.dashboard_menu_derecha {
  @apply w-4/5 p-8;
}
.dashboard_div_separacion {
  @apply flex flex-col gap-8;
}
.dashboard_contenido_funciones {
  @apply grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4 items-center;
}
.dashboard_contenido_obras {
  @apply grid grid-cols-[0.5fr_0.5fr_0.5fr_0.5fr_1fr_0.5fr_0.5fr] gap-4 items-center;
}
.dashboard_contenido_usuarios {
  @apply grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4 items-center;
}
.dashboard_contenido_actores {
  @apply grid grid-cols-[1fr_1fr_1fr] gap-4 items-center;
}
.dashboard_item {
  @apply contents text-center;
}
.dashboard_contenido_tabla {
  @apply pl-[30%];
}
.dashboard_iconos {
  @apply flex gap-8;
}
.dashboard_iconos svg {
  @apply h-8 fill-[var(--blanco)] hover:fill-[var(--botonActivo)];
}
.dashboard_put {
  @apply flex flex-col gap-8 justify-center items-center;
}
.dashboard_menu_container {
  @apply flex flex-col gap-8;
}
.dashboard_put input {
  @apply w-40 h-8 border border-[color:var(--blanco)] text-base bg-[color:var(--boton)] text-base text-[color:var(--blanco)] p-2 p-2.5 rounded-[5px] border-solid focus:border-[color:var(--bordeInput)] focus:shadow-[0_0_5px_var(--sombraBordeInput)];
  outline: none;
}
.dashboard_put textarea {
  @apply w-80 h-80 border border-[color:var(--blanco)] text-base bg-[color:var(--boton)] text-base text-[color:var(--blanco)] p-2 p-2.5 rounded-[5px] border-solid;
  outline: none;
}
.dashboard_botones {
  @apply flex flex-col gap-8 items-center;
}
.dashboard_put_actores {
  @apply flex gap-8;
}
.dashboard_put_actores button,
.dashboard_botones button {
  @apply bg-[color:var(--boton)] text-[color:var(--blanco)] border-[color:var(--blanco)] border w-40 h-8 cursor-pointer flex justify-center items-center no-underline border-solid;
}
.dashboard_put_actores button:hover,
.dashboard_botones button:hover {
  @apply bg-[color:var(--botonActivo)] border-[none];
}
.dashboard_encabezado {
  @apply font-[bold] text-center;
}
.dashboard_boton {
  @apply bg-[color:var(--botonTransparente)] text-[color:var(--blanco)] border-[color:var(--blanco)] border w-52 h-10 cursor-pointer border-solid hover:bg-[color:var(--botonActivo)] hover:border-[none];
}
@media (max-width: 768px) {
  .dashboard_menu_izquierda {
    @apply w-full h-auto;
  }
  .dashboard_menu_derecha {
    @apply w-full p-4;
  }
  .dashboard_contenido_funciones,
  .dashboard_contenido_obras,
  .dashboard_contenido_usuarios,
  .dashboard_contenido_actores {
    @apply grid-cols-[1fr];
  }
  .dashboard_encabezado {
    @apply hidden;
  }
  .dashboard_boton {
    @apply w-32 items-center;
  }
  .dashboard_put_actores {
    @apply flex flex-col;
  }
  .dashboard_put textarea {
    @apply w-36;
  }
  .dashboard_contenido_funciones > .dashboard_item:not(:last-child)::after {
    @apply content-[""] block h-px w-[calc(100%_-_30px)] mx-[15px] my-2.5;
    background: var(--bordeTarjetaSala);
  }
  .dashboard_contenido_obras > .dashboard_item:not(:last-child)::after {
    @apply content-[""] block h-px w-[calc(100%_-_30px)] mx-[15px] my-2.5;
    background: var(--bordeTarjetaSala);
  }
  .dashboard_contenido_usuarios > .dashboard_item:not(:last-child)::after {
    @apply content-[""] block h-px w-[calc(100%_-_30px)] mx-[15px] my-2.5;
    background: var(--bordeTarjetaSala);
  }
  .dashboard_contenido_actores > .dashboard_item:not(:last-child)::after {
    @apply content-[""] block h-px w-[calc(100%_-_30px)] mx-[15px] my-2.5;
    background: var(--bordeTarjetaSala);
  }
}

/*register*/
.register_container {
  @apply min-h-screen justify-center flex bg-[color:var(--fondo)] text-[color:var(--blanco)] items-center gap-8 p-8;
}
.register_formulario {
  @apply flex flex-col gap-8 h-[30rem] justify-center items-center w-[40rem];
}
.register_formulario input {
  @apply w-60 h-[1.7rem] flex bg-[color:var(--fondo)] text-[color:var(--blanco)] border-b-[color:var(--blanco)] border-b-2 border-[none] border-solid;
  outline: none;
}
.register_formulario input::placeholder {
  @apply text-[color:var(--blanco)] opacity-20;
}
.register_formulario button {
  @apply bg-[color:var(--boton)] text-[color:var(--blanco)] border-[color:var(--blanco)] border w-52 h-10 cursor-pointer flex justify-center items-center no-underline border-solid hover:bg-[color:var(--botonActivo)] hover:border-0;
}
.register_formulario a,
.register_cuenta {
  @apply text-[color:var(--blanco)] no-underline;
}
.register_formulario a:hover,
.register_cuenta:hover {
  @apply text-[color:var(--botonActivo)] underline;
}

/*sala*/
.sala_container {
  @apply min-h-screen justify-center flex flex-col bg-[color:var(--fondo)] text-[color:var(--blanco)] items-center gap-8 p-8;
}
.sala_container h2 {
  @apply text-[color:var(--titulo)];
}
.sala_svg {
  @apply flex justify-center items-center w-[30rem];
}
.sala_pantalla {
  @apply w-[35rem] h-20 w-[30rem];
}
.sala_boton {
  @apply bg-[color:var(--boton)] text-[color:var(--blanco)] border-[color:var(--blanco)] border w-52 h-10 cursor-pointer border-solid hover:bg-[color:var(--botonActivo)] hover:border-0;
}
.sala_div {
  @apply flex flex-row gap-8;
}
.infoPago_Container {
  @apply justify-center flex bg-[color:var(--fondo)] text-[color:var(--blanco)] p-8;
}
.infoPago_div1_divIzq {
  @apply w-6/12 flex flex-col items-center gap-8;
}
.infoPago_div1_divIzq h2 {
  @apply text-[color:var(--titulo)];
}
.infoPago_div1_divIzq_div {
  @apply flex gap-8 items-center;
}
.infoPago_div1_divIzq_div div {
  @apply flex gap-4 flex-col;
}
.infoPago_div1_divDcha h2 {
  @apply text-[color:var(--titulo)];
}
.infoPago_div1_divDcha_input {
  @apply h-8 w-60 border border-[color:var(--blanco)] pl-4 rounded-[20px] border-solid;
}
.infoPago_div1_divDcha {
  @apply w-6/12 flex flex-col items-center gap-4;
}
.infoPago_div1_divDcha_div {
  @apply flex flex-col justify-center;
}
.infoPago_div1_divDcha_checks {
  @apply m-2;
}
.infoPago_tarjeta {
  @apply flex flex-col items-center w-[300px] gap-4 m-auto;
}
.infoPago_tarjeta label {
  @apply mt-2.5;
}
.infoPago_tarjeta input {
  @apply border border-[color:var(--blanco)] h-8 w-60 mb-2.5 pl-4 rounded-[5px] rounded-[20px] border-solid;
}
.infoPago_caducidadContainer {
  @apply flex gap-8 mb-2.5;
}
.infoPago_caducidadContainer input {
  @apply w-[5.5rem] mr-[5px];
}
.infoPago_boton {
  @apply bg-[color:var(--boton)] text-[color:var(--blanco)] border-[color:var(--blanco)] border w-52 h-10 cursor-pointer border-solid hover:bg-[color:var(--botonActivo)] hover:border-0;
}
.modal {
  @apply fixed w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] left-0 top-0;
}
.modal-content {
  @apply bg-[color:var(--boton)] shadow-[0_4px_6px_rgba(0,0,0,0.1)] max-w-[500px] w-full p-5 rounded-[10px];
}
.close-modal {
  @apply float-right text-2xl font-[bold] cursor-pointer;
}
.sala_leyenda {
  @apply flex justify-center items-center w-3/5 mt-4;
}
.sala_leyenda div {
  @apply flex justify-center items-center w-full mr-8;
}
.sala_leyenda span {
  @apply ml-2;
}
@media (max-width: 1200px) {
  .sala_leyenda {
    @apply w-4/5;
  }
}
@media (max-width: 1000px) {
  .sala_leyenda {
    @apply w-full;
  }
  .sala_svg {
    @apply w-80;
  }
  .sala_pantalla {
    @apply w-[25rem] h-20;
  }
}
@media (max-width: 600px) {
  .sala_svg {
    @apply w-80;
  }
  .sala_pantalla {
    @apply w-80 h-20;
  }
  .sala_leyenda {
    @apply flex-col gap-8;
  }
  .sala_leyenda div {
    @apply pl-[30%];
    justify-content: start;
  }
  .sala_boton {
    @apply w-40;
  }
}

/*pagina del usuario*/
.usuario_container {
  @apply min-h-screen justify-center flex flex-col bg-[color:var(--fondo)] text-[color:var(--blanco)] items-center gap-8 p-8;
}
.usuario_boton {
  @apply bg-[color:var(--boton)] text-[color:var(--blanco)] border-[color:var(--blanco)] border w-40 h-8 cursor-pointer items-center no-underline m-4 border-solid hover:bg-[color:var(--botonActivo)] hover:border-0;
}
</style>
