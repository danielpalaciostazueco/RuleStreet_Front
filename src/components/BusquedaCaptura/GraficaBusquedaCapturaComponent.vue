<template>
    <div id="chart-container"></div>
    <BotonPaginaPrincipalComponente />
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useListadoCiudadanos } from '@/stores/storeCiudadano';
import * as echarts from 'echarts';
import BotonPaginaPrincipalComponente from '../ComponentesGenerales/BotonPaginaPrincipalComponente.vue';

const store = useListadoCiudadanos();
const { infoCiudadanosBusquedaCaptura, cargarDatosCiudadanosBusquedaCaptura } = store;
const searchQuery = ref('');
const filterField = ref('nombre');


const ciudadanosPorDia = computed(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => infoCiudadanosBusquedaCaptura.filter(ciudadano =>
        new Date(ciudadano.diaIntroducidoListaCaptura).getDay() === days.indexOf(day) + 1
    ).length);
});

function fieldDisplayName(field: keyof { [key: string]: string }) {
    const names: { [key: string]: string } = {
        nombre: 'Nombre',
        apellidos: 'Apellidos',
        dni: 'DNI',
        genero: 'Género',
        nacionalidad: 'Nacionalidad',
        fechaNacimiento: 'Fecha de Nacimiento',
        isPeligroso: 'Peligroso'
    };
    return names[field] || field;
}
onMounted(() => {
    cargarDatosCiudadanosBusquedaCaptura().then(() => {
        const chartContainer = document.getElementById('chart-container');
        if (chartContainer) {
            const chart = echarts.init(chartContainer);
            const option = {
                title: {
                    text: 'Ciudadanos en Búsqueda y Captura por Día',
                    subtext: 'Distribución semanal',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 60,
                    interval: 20,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [{
                    data: ciudadanosPorDia.value,
                    type: 'line',
                    smooth: true,
                    areaStyle: {}
                }]
            };
            chart.setOption(option);
            window.addEventListener('resize', () => {
                chart.resize();
            });
        }
    });
});

</script>

<style scoped>
#chart-container {
    position: relative;
    height: 500px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    background: linear-gradient(to bottom right, #ffffff, #f1f1f1);
}
</style>