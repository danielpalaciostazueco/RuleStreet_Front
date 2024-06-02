<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { useListadoMultas } from '@/stores/storeMulta';

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
    codigoPenal: CodigoPenal;
}
export interface CodigoPenal {
    idCodigoPenal: number;
    articulo: string;
    article: string;
    descripcion: string;
    description: string;
    precio: number;
    sentencia: string;
}

interface ErrorMessages {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
}

interface ErrorTimeouts {
    cardNumber: number | undefined;
    expirationDate: number | undefined;
    cvv: number | undefined;
}

export default defineComponent({
    props: {
        visible: {
            type: Boolean as PropType<boolean>,
            required: true
        },
        multa: {
            type: Object as PropType<Multa | null | undefined>,
            required: false
        }
    },
    data() {
        return {
            cardNumber: '',
            expirationDate: '',
            cvv: '',
            errorMessages: {
                cardNumber: '',
                expirationDate: '',
                cvv: ''
            } as ErrorMessages,
            errorTimeouts: {
                cardNumber: undefined,
                expirationDate: undefined,
                cvv: undefined
            } as ErrorTimeouts
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
                this.clearErrors();
            } else {
                if (!/^\d{16}$/.test(cardData.cardNumber)) {
                    this.setError('cardNumber', 'Número de tarjeta inválido.');
                }
                if (!/^\d{3,4}$/.test(cardData.cvv)) {
                    this.setError('cvv', 'CVV inválido.');
                }
                if (!this.validateExpirationDate(cardData.expirationDate)) {
                    this.setError('expirationDate', 'Fecha de expiración inválida o ya ha pasado.');
                }
            }
        },
        validateExpirationDate(expirationDate: string): boolean {
            const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

            if (!expirationDateRegex.test(expirationDate)) {
                return false;
            }

            const [expMonth, expYear] = expirationDate.split('/').map(Number);

            if (expMonth > 12) {
                return false;
            }

            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;

            return !(expYear < currentYear || (expYear === currentYear && expMonth < currentMonth));
        },

        setError(field: keyof ErrorMessages, message: string) {
            this.errorMessages[field] = message;
            clearTimeout(this.errorTimeouts[field]);
            this.errorTimeouts[field] = window.setTimeout(() => {
                this.errorMessages[field] = '';
            }, 4000);
        },
        clearErrors() {
            (Object.keys(this.errorMessages) as Array<keyof ErrorMessages>).forEach((field) => {
                this.errorMessages[field] = '';
                clearTimeout(this.errorTimeouts[field]);
                this.errorTimeouts[field] = undefined;
            });
        },

        beforeDestroy() {
            (Object.keys(this.errorTimeouts) as Array<keyof ErrorTimeouts>).forEach((field) => {
                if (this.errorTimeouts[field] !== undefined) {
                    clearTimeout(this.errorTimeouts[field]);
                }
            });
        },

        validateCardData(cardData: { cardNumber: string, expirationDate: string, cvv: string }) {
            const cardNumberRegex = /^\d{16}$/;
            const cvvRegex = /^\d{3,4}$/;

            if (!cardNumberRegex.test(cardData.cardNumber) || !cvvRegex.test(cardData.cvv)) {
                return false;
            }

            const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!expirationDateRegex.test(cardData.expirationDate)) {
                return false;
            }

            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            const [expMonth, expYear] = cardData.expirationDate.split('/').map(Number);

            if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                return false;
            }

            return true;
        }

    }
});
</script>

<template>
    <div v-if="visible" class="payment-modal">
        <div class="payment-modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <h2>Pagar Multa</h2>
            <form @submit.prevent="submitPayment">
                <div class="form-group">
                    <label for="cardNumber">Número de Tarjeta</label>
                    <input type="text" id="cardNumber" v-model="formattedCardNumber" @input="formatCardNumber"
                        maxlength="19" placeholder="0000 0000 0000 0000" required />
                    <span v-if="errorMessages.cardNumber" class="error-message">{{ errorMessages.cardNumber }}</span>
                </div>
                <div class="form-group">
                    <label for="expirationDate">Fecha de Expiración</label>
                    <input type="text" id="expirationDate" v-model="expirationDate" @input="formatExpirationDate"
                        maxlength="5" placeholder="MM/AA" required />
                    <span v-if="errorMessages.expirationDate" class="error-message">{{ errorMessages.expirationDate
                        }}</span>
                </div>
                <div class="form-group">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" v-model="cvv" maxlength="3" placeholder="000" required />
                    <span v-if="errorMessages.cvv" class="error-message">{{ errorMessages.cvv }}</span>
                </div>
                <div class="button-container">
                    <button type="submit">Pagar {{ multa?.precio }}€</button>
                </div>
            </form>
        </div>
    </div>
</template>

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
    background-color: var(--colorFondoTablaModal);
    z-index: 1000;
}

.payment-modal-content {
    background-color: var(--colorBusquedaCiudadanoBusqueda);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px var(--colorNegro);
    max-width: 400px;
    width: 100%;
    color: var(--colorTextoTarjeta);
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
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
    color: var(--colorNegro);
    outline: none;
    background-color: var(--colorBlanco);
    border-radius: 0.7rem;
}

.button-container {
    text-align: right;
}

button {
    background-color: var(--colorBotonBusquedaCiudadano);
    color: var(--colorBlanco);
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: var(--colorBotonBusquedaCiudadanoActivo);
    color: var(--colorBlanco);
}

.error-message{
    color: var(--colorRojo);
}
</style>
