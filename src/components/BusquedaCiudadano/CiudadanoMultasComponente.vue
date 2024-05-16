<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useListadoCodigoPenal } from '@/stores/storeCodigoPenal';
import { useListadoAuth } from '@/stores/storeAuth';
import { useListadoMultas } from '@/stores/storeMulta';
import { useRoute } from 'vue-router';

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:visible', 'onModalClose'],
    setup(props, { emit }) {
        const route = useRoute();
        const idCiudadano = ref(0);

        const newMulta = ref({
            descripcion: '',
            monto: 0
        });

        const { cargarDatosCodigoPenal, infoCodigoPenal, cargarDatosCodigoPenalId } = useListadoCodigoPenal();
        const { infoPolicias, loadPoliceInfo } = useListadoAuth();
        const { guardarMulta } = useListadoMultas();
        const articuloSeleccionado = ref({
            idCodigoPenal: 0,
            articulo: '',
            descripcion: '',
            precio: 0,
            sentencia: ''
        });

        const filtro = ref('');

        onMounted(async () => {
            loadPoliceInfo();
            await cargarDatosCodigoPenal();
            const path = window.location.pathname;
            const segments = path.split('/');
            const lastSegment = segments.pop() || segments.pop();
            idCiudadano.value = parseInt(lastSegment, 10);
        });

        const close = () => {
            newMulta.value = { descripcion: '', monto: 0 };
            articuloSeleccionado.value = { idCodigoPenal: 0, articulo: '', descripcion: '', precio: 0, sentencia: '' };
            filtro.value = '';
            emit('update:visible', false);
            emit('onModalClose');

        };

        const guardarId = async (id: number) => {
            const response = await cargarDatosCodigoPenalId(id);
            if (response) {
                articuloSeleccionado.value = response;
            }
        };

        const submitMulta = async () => {
            const multaData = {
                idMulta: 0,
                idPolicia: infoPolicias.IdPolicia,
                fecha: new Date().toISOString(),
                idCodigoPenal: articuloSeleccionado.value.idCodigoPenal,
                pagada: false,
                descripcion: articuloSeleccionado.value.descripcion,
                idCiudadano: idCiudadano.value
            };
            await guardarMulta(multaData);
            close();
        };

        const articulosFiltrados = computed(() => {
            return infoCodigoPenal.filter(item =>
                item.descripcion.toLowerCase().includes(filtro.value.toLowerCase())
            );
        });

        return {
            newMulta,
            infoCodigoPenal,
            articulosFiltrados,
            submitMulta,
            close,
            guardarId,
            articuloSeleccionado,
            filtro
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
                    <input class="model_buscador" type="text" v-model="filtro"
                        placeholder="Buscar en el código criminal...">
                </div>
                <div class="model_tabla">
                    <div class="model_tabla_encabezado">ARTICULO</div>
                    <div class="model_tabla_encabezado">DESCRIPCIÓN</div>
                    <div class="model_tabla_encabezado">CANTIDAD</div>
                    <div class="model_tabla_encabezado">SENTENCIA</div>
                    <div class="model_tabla_encabezado">Añadir</div>

                    <div v-for="item in articulosFiltrados" :key="item.idCodigoPenal" class="model_tabla_fila">
                        <div class="model_tabla_item">{{ item.articulo }}</div>
                        <div class="model_tabla_item_texto">{{ item.descripcion }}</div>
                        <div class="model_tabla_item">{{ item.precio }}</div>
                        <div class="model_tabla_item">{{ item.sentencia }}</div>
                        <div class="model_tabla_item_filtro" @click="guardarId(item.idCodigoPenal)">Añadir</div>
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
                        <button class="modal_boton" @click="submitMulta">Añadir Multa</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

  
</template>

<style scoped>
.modal_fondo {
  @apply fixed w-full h-full bg-[color:var(--colorFondoPantallaModal)] flex justify-center items-center left-0 top-0;
}

.modal_container {
  @apply w-[90%] h-[90%] md:w-[70%] md:h-[50rem] flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-5 rounded-[10px] bg-[color:var(--colorFondoModal)];
}

.modal_izquierda {
  @apply flex w-full md:w-3/5 flex-col gap-4 md:gap-8;
}

.modal_derecha {
  @apply flex w-full md:w-2/5 flex-col gap-4 md:gap-8 mt-4 md:mt-0;
}

.modal_titulo {
  @apply w-full;
}

.modal_titulo h1 {
  @apply bg-[color:var(--colorTituloModal)] flex items-center h-12 md:h-16 justify-center text-[color:var(--colorBlanco)] rounded-[0.7rem];
}

.model_buscador {
  @apply w-full h-8 md:h-10 bg-[color:var(--colorNegro)] text-[color:var(--colorBlanco)] pl-4 md:pl-8 rounded-[0.7rem] border-[none] outline-none;
}

.model_buscador::placeholder {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.model_tabla {
  @apply w-full border-collapse;
}

.model_tabla th, .model_tabla td {
  @apply p-2 md:p-3 text-left;
}

.model_tabla th {
  @apply bg-[color:var(--colorNegro)] text-[color:var(--colorBlanco)];
}

.model_tabla tr:nth-child(even) {
  @apply bg-[color:var(--colorFondoTablaModal)];
}

.model_tabla tr:hover {
  @apply bg-gray-200;
}

@media (max-width: 768px) {
  .modal_container {
    @apply w-[90%] h-[90%] flex flex-col gap-4;
  }

  .modal_izquierda, .modal_derecha {
    @apply w-full;
  }

  .modal_derecha {
    @apply mt-4;
  }

  .model_tabla th, .model_tabla td {
    @apply text-sm p-2;
  }

  .model_buscador {
    @apply h-8;
  }

  .modal_derecha_container_tarjeta {
    @apply text-sm px-2;
  }

  .modal_boton {
    @apply w-20 h-8 text-sm;
  }
}

@media (max-width: 480px) {
  .modal_container {
    @apply w-[95%] h-[90%] flex flex-col gap-2 p-2;
  }

  .model_tabla {
    @apply block;
  }

  .model_tabla th, .model_tabla td {
    @apply block text-xs p-1;
  }

  .model_tabla tr {
    @apply flex flex-col mb-2;
  }

  .modal_derecha {
    @apply mt-4;
  }

  .model_buscador {
    @apply h-8;
  }

  .modal_derecha_container_tarjeta {
    @apply text-xs px-1;
  }

  .modal_boton {
    @apply w-16 h-6 text-xs;
  }
}
</style>
