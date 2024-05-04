<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useListadoCodigoPenal } from '@/stores/storeCodigoPenal';

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:visible'],
    setup(props, { emit }) {
        const newMulta = ref({
            descripcion: '',
            monto: 0
        });

        const { cargarDatosCodigoPenal, infoCodigoPenal, cargarDatosCodigoPenalId } = useListadoCodigoPenal();
        const articuloSeleccionado = ref({
            articulo: '',
            descripcion: '',
            precio: 0,
            sentencia: ''
        });
        onMounted(async () => {
            await cargarDatosCodigoPenal();
        });

        const close = () => {
            newMulta.value = { descripcion: '', monto: 0 };
            articuloSeleccionado.value = { articulo: '', descripcion: '', precio: 0, sentencia: '' };
            emit('update:visible', false);
        };

        const guardarId = async (id: number) => {
            const response = await cargarDatosCodigoPenalId(id);
            if (response) {
                articuloSeleccionado.value = response;
            }
        };


        return {
            newMulta,
            infoCodigoPenal,
            submitMulta: close,
            close,
            guardarId,
            articuloSeleccionado
        };
    }
});

</script>

<template>
    <div v-if="visible" class="modal_fondo" @click.self="close">
        <div class="modal_container">
            <div class="modal_izquierda">
                <div class="modal_titulo">
                    <h1>CODIGO PENAL</h1>
                </div>
                <div>
                    <input class="model_buscador" type="text" v-model="newMulta.descripcion"
                        placeholder="Buscar en el código criminal...">
                </div>
                <div class="model_tabla">
                    <div class="model_tabla_encabezado">ARTICULO</div>
                    <div class="model_tabla_encabezado">DESCRIPCIÓN</div>
                    <div class="model_tabla_encabezado">CANTIDAD</div>
                    <div class="model_tabla_encabezado">SENTENCIA</div>
                    <div class="model_tabla_encabezado">Añadir</div>

                    <div v-for="item in infoCodigoPenal" :key="item.idCodigoPenal" class="model_tabla_fila">
                        <div class="model_tabla_item">{{ item.articulo }}</div>
                        <div class="model_tabla_item_texto">{{ item.descripcion }}</div>
                        <div class="model_tabla_item">{{ item.precio }}</div>
                        <div class="model_tabla_item">{{ item.sentencia }}</div>
                        <div class="model_tabla_item" @click="guardarId(item.idCodigoPenal)">Añadir</div>
                    </div>

                </div>
            </div>
            <div class="modal_derecha">
                <div class="modal_titulo">
                    <h1>MAS</h1>
                </div>
                <div class="modal_derecha_div">
                    <div class="modal_derecha_container">
                        <p>CONCEPTO DE MULTA</p>
                        <div class="modal_derecha_container_tarjeta" v-if="articuloSeleccionado.articulo">
                            <div class="izquierda">
                                <p>{{ articuloSeleccionado.articulo }}</p>
                            </div>
                            <div class="derecha">
                                <p>{{ articuloSeleccionado.sentencia }}</p>
                                <p>{{ articuloSeleccionado.precio }}€</p>
                            </div>
                        </div>

                    </div>
                    <div class="boton_container">
                        <button class="modal_boton">Añadir</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal_fondo {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--colorFondoPantallaModal);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal_container {
    background: var(--colorFondoModal);
    padding: 20px;
    border-radius: 10px;
    width: 70%;
    height: 50rem;
    display: flex;
    gap: 2rem;
}

.modal_izquierda {
    display: flex;
    width: 60%;
    flex-direction: column;
    gap: 2rem;
}

.modal_derecha {
    display: flex;
    width: 40%;
    flex-direction: column;
    gap: 2rem;
}

.modal_titulo {
    width: 100%;
}

.modal_titulo h1 {
    background-color: var(--colorTituloModal);
    border-radius: 0.7rem;
    display: flex;
    align-items: center;
    height: 4rem;
    justify-content: center;
    color: var(--colorBlanco);
}

.model_buscador {
    width: 100%;
    border-radius: 0.7rem;
    height: 1.5rem;
    background-color: var(--colorNegro);
    outline: none;
    border: none;
    padding-left: 2rem;
    color: var(--colorBlanco);
}

.model_buscador::placeholder {
    color: var(--colorTextoTarjeta);
}

.model_tabla {
    display: grid;
    grid-template-columns: 0.5fr 5fr 0.5fr 0.5fr 0.5fr;
    gap: 0.5rem;
    width: 100%;
    overflow-y: auto;
    padding: 10px;
}

.model_tabla::-webkit-scrollbar {
    width: 8px;
}

.model_tabla::-webkit-scrollbar-thumb {
    background-color: var(--colorBlanco);
    border-radius: 4px;
}

.model_tabla::-webkit-scrollbar-thumb:hover {
    background-color: var(--colorFondoTablaModal);
    cursor: pointer;
}

.model_tabla_encabezado {
    font-weight: bold;
    padding: 12px;
    background-color: var(--colorNegro);
    color: var(--colorBlanco);
    text-align: center;
}

.model_tabla_fila {
    display: contents;
}

.model_tabla_item {
    padding: 10px;
    background-color: var(--colorFondoTablaModal);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--colorTextoTarjeta);
}

.model_tabla_item_texto {
    padding: 10px;
    background-color: var(--colorFondoTablaModal);
    display: flex;
    align-items: center;
    color: var(--colorTextoTarjeta);
}

.modal_derecha_div {
    background-color: var(--colorFondoTablaModal);
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    justify-content: space-between;
}

.modal_derecha_div p {
    color: var(--colorTextoTarjeta);
}

.modal_derecha_container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.modal_derecha_container_tarjeta {
    display: flex;
    justify-content: space-between;
    background-color: var(--colorTarjetaModal);
    border: 1px solid var(--colorBlanco);
    width: 100%;
    height: 2rem;
    align-items: center;
    border-radius: 0.2rem;
    padding: 0rem 1rem 0rem 1rem;
}

.derecha {
    display: flex;
    gap: 1rem;
}

.modal_boton {
    width: 6rem;
    height: 1.5rem;
    background-color: var(--colorTarjetaModal);
    color: var(--colorTextoTarjeta);
    border: none;
}

.modal_boton:hover {
    cursor: pointer;
    color: var(--colorBlanco);
    background-color: var(--colorFondoPantallaModal);
}

.boton_container {
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>