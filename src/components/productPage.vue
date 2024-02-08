<template>
    <div v-if="isLoading" class="loader">
        <div class="loader-inner"></div>
    </div>
    <div v-else-if="error">{{ errorMessage }}</div>
    <div v-else>
        <img :src="prodData.image ? prodData.image : require('@/assets/image-model2.webp')" alt="Product Image"
            style="width: 100%;">
        <p>{{ prodData.model }}</p>
        <h2>{{ prodData.type }}</h2>

        <div v-if="prodData.prp">
            <p>Цена: {{ prodData.prp }}<small>₸</small></p>
            <p>Процент скидки: {{ discount() }}%</p>
            <p>Цена со скидкой: <del>{{ prodData.price }}<small>₸</small></del></p>
        </div>
        <div v-else>
            <p>Цена: {{ prodData.price }}<small>₸</small></p>
        </div>

        <p>СмартБонус: {{ prodData.smartBonus }}</p>
        <p>Рассрочка на 12 месяцев: {{ loan() }}<small>₸</small> в месяц</p>

        
        <div class="specs">
            <h3>Краткие характеристики</h3>
            <div v-for="(attribute, index) in prodData.attributes" :key="index" class="spec">
                <div class="specName">{{ attribute.attribute }}</div>
                <div class="specVal">{{ attribute.parameter }}</div>
            </div>
        </div>

        <div id="quantity">
            <h3>Наличие по складам</h3>
            <div v-for="(city, cityIndex) in prodData.cities" :key="cityIndex">
                <div>{{ city.city }}</div>
                <div v-for="(warehouse, warehouseIndex) in city.warehouses" :key="warehouseIndex">
                    {{ warehouse.name }}: {{ warehouse.quantity }}
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
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.isLoading = true;
            axios.post(`http://dev.bosch/index.php?route=api/product/getProduct/`, {
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
            });
        },
        discount() {
            return Math.round(((this.prodData.price - this.prodData.prp) / this.prodData.price) * 100);
        },
        loan() {
            if (this.prodData.prp)
                return Math.round(this.prodData.price / 12);
            else
                return Math.round(this.prodData.price / 12);
        }
    },
}
</script>
<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}

.loader-inner {
  position: relative;
  width: 120px;
  height: 60px;
  border-radius: 60px 60px 0 0;
  background-color: #ccc;
  animation: loader-rotate 2s infinite linear;
}

.loader-inner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  border-radius: 0 60px 0 0;
  background-color: #f0f0f0;
  transform-origin: right;
  animation: loader-brighten 2s infinite linear;
}

@keyframes loader-rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader-brighten {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}
</style>