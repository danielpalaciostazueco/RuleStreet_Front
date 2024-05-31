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

interface CodigoPenal {
    idCodigoPenal: number;
    articulo: string;
    article: string;
    descripcion: string;
    description: string;
    precio: number;
    sentencia: string;
}

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

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        multa: {
            type: Object as PropType<Multa | null | undefined >,
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.payment-modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    position: relative;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
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
}

.button-container {
    text-align: center;
}

.button-container button {
    padding: 10px 20px;
    cursor: pointer;
}
</style>
