<template>
    <div v-if="isLoading" class="loader">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <div v-else-if="error">{{ errorMessage }}</div>
    <div v-else>
        <div class="img-wrap">
        <img :src="prodData.image ? prodData.image : require('@/assets/image-model2.webp')" alt="Product Image"
            >
        </div>
        <div class="prodName">
            <p>{{ prodData.model }}</p>
            <h2>{{ prodData.name }}</h2>
        </div>
        <div class="pricing">
            <div v-if="prodData.prp && prodData.prp != prodData.rrp">
                <p class="price">{{ prodData.prp.toLocaleString() }}<small>₸</small></p>
                <p class="sale">{{ discount() }}%</p>
                <p class="oldPrice"><del>{{ prodData.rrp.toLocaleString() }}</del><small>₸</small></p>
            </div>
            <div v-else>
                <p class="price">{{ prodData.rrp.toLocaleString() }}<small>₸</small></p>
            </div>
            <p class="bonus">{{ bonusPercentage }} бонусов</p>
        </div>
        <div class="loanWrap" v-if="prodData.rrp > 10000">
            <p class="loan" @click="LoanClick">
                {{ loanValue.value }}<small>₸</small><span> x {{ loanValue.months }} мес</span>
            </p>
        </div>

        <div class="specs">
            <h3>Краткие характеристики</h3>
            <div v-for="(attribute, index) in prodData.attributes" :key="index" class="spec">
                <div class="specName">{{ attribute.attribute }}</div>
                <div class="specVal">{{ attribute.parameter }}</div>
            </div>
        </div>

        <div id="quantity">
            <h3>Наличие по складам</h3>
            <div class="list-store" v-for="(city, cityIndex) in prodData.cities" :key="cityIndex">
                <div class="citi">{{ city.city }}</div>
                <div class="store" v-for="(warehouse, warehouseIndex) in city.warehouses" :key="warehouseIndex">
                    <div class="location">{{ warehouse.name }}</div>
                    <div class="quant" :class="getQuantityClass(warehouse.quantity)">{{ warehouse.quantity }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'productPage',
    props: {
        id: String
    },
    data() {
        return {
            prodData: null,
            isLoading: false,
            error: null,
            errorMessage: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.',
            showLoanFor24: false
        };
    },
    created() {
        this.fetchData();
    },
    watch: {
        // Наблюдатель за параметром маршрута 'id'
        '$route.params.id': function(newId, oldId) {
            // Если новый 'id' отличается от старого, делаем запрос на API
            if (newId !== oldId) {
                this.fetchData();
            }
        }
    },
    methods: {
        fetchData() {
            this.isLoading = true;
            axios.post(`https://boschcenter.kz/index.php?route=api/product/getProduct/`, {
                product_id: this.$route.params.id,
            })
                .then((response) => {
                    this.prodData = response.data;
                    this.isLoading = false;
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных', error);
                    this.error = error.message || this.errorMessage;
                    this.isLoading = false;
                })
        },
        discount() {
            return Math.round(((this.prodData.rrp - this.prodData.prp) / this.prodData.rrp) * 100);
        },
        loan() {
            const price = parseFloat(this.prodData.price);

            let months = 1;

            if (price > 45000) {
                months = 12;
            } else if (price > 20000) {
                months = 6;
            } else if (price > 10000) {
                months = 3;
            }
            return { months: months, value: Math.round(price / months).toLocaleString() };
        },
        LoanClick() {
            const price = parseFloat(this.prodData.price);
            if (price > 80000) {
                this.showLoanFor24 = !this.showLoanFor24;
            }
        },
        getQuantityClass(quantity) {
            const num = parseInt(quantity);
            if (num === 0) {
                return 'red';
            } else if (num < 5) {
                return 'yellow';
            } else {
                return '';
            }
        }
    },
    computed: {
        bonusPercentage() {
            const bonus = parseFloat(this.prodData.bonus);
            return Math.round((bonus / 100) * this.prodData.price).toLocaleString();

        },
        loanValue() {
            if (this.showLoanFor24) {
                return { months: 24, value: Math.round(this.prodData.price / 24).toLocaleString() };
            } else {
                return this.loan();
            }
        }
    }
}
</script>
<style scoped>
#content {
    padding: 0 24px;
}
.img-wrap {
  margin-bottom: 16px;
}
#content .img-wrap {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
}
#content .img-wrap img {
  height: 212px;
  width: auto !important;
  margin: auto;
}
.prodName p {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    color: #505050;
}

.prodName h2 {
    margin: 4px 0 0;
    font-size: 28px;
    font-weight: 700;
    color: #232323;
    padding: 0 0 16px;
    border-bottom: 1px solid #f0f0f0;
}

.pricing {
    padding: 16px 0;
    border-bottom: 1px solid #f0f0f0;
}

.pricing .price {
    font-size: 28px;
    color: #2954c2;
    font-weight: 700;
}

.pricing p {
    margin: 0;
}
.loan {
  padding: 8px;
  width: auto;
  display: flex;
  flex-flow: row nowrap;
  background: #EBF0FF;
  color: #2954C2;
  font-size: 20px;
  font-weight: 700;
  align-items: baseline;
}
.loanWrap {
  width: auto;
  display: flex;
  flex-flow: row;
}
.loan span {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-left: 8px;
  font-size: 16px;
  font-weight: 400;
}
.specs h3 {
  margin: 0 0 20px;
}
.specs {
  margin: 60px 0;
}
.spec {
  display: flex;
  flex-flow: row nowrap;
  font-size: 16px;
  font-weight: 400;
  color: #808080;
  padding: 8px 0;
  line-height: 20px;
}
.spec .specName {
  flex-basis: 50%;
}
.spec .specVal {
  color: #232323;
}
.citi {
  font-weight: 600;
  font-size: 18px;
  padding: 8px 0;
}
.store {
  display: flex;
  flex-flow: row nowrap;
  padding: 8px 0;
  font-size: 16px;
  font-weight: 400;
  gap: 20px;
}
.location {
  color: #505050;
  flex-basis: 50%;
}
.list-store+.list-store {
  margin-top: 24px;
}
.quant {
  color: #0DA300;
}
.quant.red {
  color: red;
}
.quant.yellow {
  color: #DF8D13;
}
.pricing>div:not(:empty) {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
}
#quantity{
    margin-bottom: 80px;
}
.pricing .sale {
    font-size: 20px;
    font-weight: 800;
    color: #fff;
    padding: 4px 8px;
    background: #2954c2;
}

.pricing .oldPrice {
    font-size: 20px;
    font-weight: 500;
    color: #505050;
}

.pricing .bonus {
    font-size: 16px;
    font-weight: 400;
    color: #232323;
}




.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 250px);
    position: relative;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 4px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #f0f0f0 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>