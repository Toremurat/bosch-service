<template>
    <div id="search">
        <div class="search">
            <input v-model="searchTerm" @input="handleSearch" placeholder="Поиск" @focus="isInputFocused = true" @blur="isInputFocused = false" />
            <div class="icon" v-if="searchTerm || isInputFocused"  @click="clearSearch">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="searchTerm || isInputFocused">
                    <path d="M15.0005 15.0001L32.9999 32.9995" stroke="#232323" stroke-width="1.5"/>
                    <path d="M32.9995 15.0001L15.0001 32.9995" stroke="#232323" stroke-width="1.5"/>
                </svg>
            </div>
            <div class="icon" v-else>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="23.5" cy="23.5" r="9.75" stroke="#232323" stroke-width="1.5"/>
                    <path d="M30 30L35 35" stroke="#232323" stroke-width="1.5"/>
                </svg>
            </div>
        </div>
    </div>
    <div class="divider"></div>
    <div id="searchWrap" >
        <template  v-if="searchData.length > 0">
            <div id="searchResult">
            <router-link
                v-for="result in searchData"
                :key="result.product_id"
                :to="'/product/'+ result.product_id"
                @click="clearSearch">
                <div class="search-item" :class="{ 'stock': result.quantity < 1 }">
                    <img :src="prodData.image ? prodData.image : require('@/assets/image-model2.webp')" alt="Product Image" class="product-image"/>
                    <div class="product-details">
                        <div class="model">{{ result.model }}</div>
                        <div class="type">{{ result.name }}</div>
                    </div>
                </div>
            </router-link>
        </div>
        </template>
    
        <template v-else-if="searchTerm.length >= 3 && !isLoading">
            <div class="searchErr">
                <h3>К сожалению, мы ничего не нашли по вашему запросу</h3>
                <p>Попробуйте изменить поисковый запрос и проверить, нет ли опечаток</p>
            </div>
        </template>
        <template v-else-if="isLoading">
            <div class="searchLoading">
                <p>Загрузка данных...</p>
            </div>
        </template>
    </div>    
</template>

<script>
import axios from 'axios';

export default {
data() {
    return {
        searchTerm: '',
        searchData: [],
        debounceTimer: null,
        isInputFocused: false,
        isLoading: false
        };
    },
    methods: {
        handleSearch() {
            clearInterval(this.debounceTimer);
            if (this.searchTerm.length >= 3) {
                this.isLoading = true;
                this.debounceTimer = setTimeout(() => {
                    this.fetchData();
                }, 500);
            }
        },
        clearSearch() {
            this.searchTerm = '';
            this.searchData = [];
        },
        fetchData() {
            axios.post(`http://boschcenter.kz/index.php?route=api/product/getProducts`, {
                model: this.searchTerm
            })
            .then(response => {
                this.searchData = response.data;
                
            })
            .catch(error => {
                console.error('Ошибка при получении данных', error);
                this.searchData = [];
            })
            .finally(() => {
                this.isLoading = false; // устанавливаем флаг isLoading в false после завершения загрузки
            });
        },
    },
};
</script>

<style scoped>
#search input {
	width: 100%;
	display: flex;
	box-sizing: border-box;
	border: none;
	background: #F0F0F0;
}
#search input {
	font-size: 18px;
	font-weight: 400;
	line-height: 20px;
	color: #232323;
	padding: 18px 16px;
    width: 100%;
    box-sizing: border-box;
}
#search .icon {
	position: absolute;
	left: calc(100% - 52px);
	top: 4px;
	display: flex;
}
#search .search {
	position: relative;
}
.divider {
    border-bottom: 1px solid #f0f0f0;
    position: absolute;
    left: 0;
    top: 124px;
    width: 100%;
}
#searchResult{
    margin-top: 12px;
    padding: 0 24px;
    max-height: 100vh;
    position: absolute;
    background: #fff;
    width: calc(100% - 48px);
    height: calc(100vh - 124px);
    overflow-y: scroll;
    left: 0;
}
#searchResult .searchErr h3{
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin: 0 0 16px;
}
#searchResult .searchErr p{
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #505050;
    margin: 0;
}
#searchResult img {
	width: 52px;
	height: 52px;
}
#searchResult .search-item {
	display: flex;
	flex-flow: row nowrap;
	align-content: center;
	gap: 12px;
	padding: 16px 0;
}
#searchResult .product-details .model {
	font-size: 18px;
	line-height: 20px;
	color: #232323;
	font-weight: 400;
}
#searchResult .product-details .type {
	font-size: 16px;
	line-height: 20px;
	color: #505050;
}
#searchResult .product-details > div {
	text-decoration: none!Important;
}
#searchResult a {
	text-decoration: none;
}
#searchResult .product-details {
	display: flex;
	flex-flow: column;
	justify-content: center;
    width: 100%;
}
</style>