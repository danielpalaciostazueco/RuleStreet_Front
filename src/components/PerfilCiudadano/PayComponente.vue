<template>
    <div v-if="visible" class="payment-modal">
        <div class="payment-modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <h2>Pagar Multa</h2>
            <form @submit.prevent="submitPayment">
                <div class="form-group">
                    <label for="cardNumber">Número de Tarjeta</label>
                    <input type="text" id="cardNumber" v-model="formattedCardNumber" @input="formatCardNumber"
                        maxlength="19" required />
                </div>
                <div class="form-group">
                    <label for="expirationDate">Fecha de Expiración</label>
                    <input type="text" id="expirationDate" v-model="expirationDate" @input="formatExpirationDate"
                        maxlength="5" placeholder="MM/AA" required />
                </div>
                <div class="form-group">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" v-model="cvv" maxlength="4" required />
                </div>
                <div class="button-container">
                    <button type="submit">Pagar {{ multa?.precio }}€</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

interface Multa {
    idMulta: number;
    idPolicia: number;
    fecha: Date;
    precio: number;
    articuloPenal: string;
    descripcion: string;
    description: string;
    pagada: boolean;
    idCiudadano: number;
    codigoPenal: CodigoPenal[];
}

interface CodigoPenal {
    idCodigoPenal: number;
    articulo: string;
    article: string;
    descripcion: string;
    description: string;
    precio: number;
    sentencia: string;
}

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        multa: {
            type: Object as PropType<Multa | null>,
            required: false
        }
    },
    data() {
        return {
            cardNumber: '',
            expirationDate: '',
            cvv: ''
        };
    },
    computed: {
        formattedCardNumber: {
            get() {
                return this.cardNumber.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
            },
            set(value: string) {
                this.cardNumber = value.replace(/\s/g, '');
            }
        }
    },
    methods: {
        formatCardNumber() {
            if (this.cardNumber.length > 16) {
                this.cardNumber = this.cardNumber.slice(0, 16);
            }
        },
        formatExpirationDate() {
            if (this.expirationDate.length === 2 && !this.expirationDate.includes('/')) {
                this.expirationDate = this.expirationDate + '/';
            }
            if (this.expirationDate.length > 5) {
                this.expirationDate = this.expirationDate.slice(0, 5);
            }
        },
        submitPayment() {
            const cardData = {
                cardNumber: this.cardNumber,
                expirationDate: this.expirationDate,
                cvv: this.cvv
            };
            if (this.validateCardData(cardData)) {
                this.$emit('pay', this.multa, cardData);
            } else {
                alert('Por favor, introduzca datos de tarjeta válidos.');
            }
        },
        validateCardData(cardData: { cardNumber: string, expirationDate: string, cvv: string }) {
            const cardNumberRegex = /^\d{16}$/;
            const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            const cvvRegex = /^\d{3,4}$/;

            return cardNumberRegex.test(cardData.cardNumber) &&
                expirationDateRegex.test(cardData.expirationDate) &&
                cvvRegex.test(cardData.cvv);
        }
    }
});
</script>

<style scoped>
.payment-modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.payment-modal-content {
    background-color: #2c3e50;
    /* Dark blue background */
    color: #ecf0f1;
    /* Light text color */
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close {
    color: #ecf0f1;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #bdc3c7;
    text-decoration: none;
    cursor: pointer;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #34495e;
    border-radius: 5px;
    background-color: #34495e;
    color: #ecf0f1;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

button {
    background-color: #2980b9;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #3498db;
}
</style>
