<template>
  <div class="application" v-if="isPortrait">
    <header>
      <div class="topHeader">
        <div class="logo">
          <img src="@/assets/logo.webp" alt="">
        </div>
      </div>
      <div class="bottomHeader">
        <searchBar @productSelected="handleProductSelected" @clearProdData="clearProdData"/>
      </div>
    </header>
    <div id="content">

      <div v-if="prodData != null">
        <div v-if="isLoading" class="loader">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div v-else-if="error">{{ errorMessage }}</div>

        <div v-else>
          <div class="img-wrap">
            <img :src="prodData.image ? prodData.image : require('@/assets/image-model2.webp')" alt="Product Image">
          </div>
          <div class="prodName">
            <p>{{ prodData.model }}</p>
            <h2>{{ prodData.name }}</h2>
          </div>
          <div class="pricing">
            <div v-if="prodData.prp && prodData.prp != prodData.rrp">
              <p class="price">{{ prodData.prp.toLocaleString() }}<small>₸</small></p>
              <p class="sale">-{{ discount() }}%</p>
              <p class="oldPrice"><del>{{ prodData.rrp.toLocaleString() }}</del><small>₸</small></p>
            </div>
            <div v-else>
              <p class="price">{{ prodData.rrp.toLocaleString() }}<small>₸</small></p>
            </div>
            <p class="bonus">до {{ bonusPercentage }} бонусов</p>
          </div>
          <div class="loanWrap" v-if="prodData.rrp > 10000">
            <p class="loan">
              {{ loanValue.value }}<small>₸</small><span> x {{ loanValue.months }} мес</span>
            </p>
            <div class="changer" @click="LoanClick" v-if="prodData.rrp > 80000">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                v-if="showLoanFor24">
                <path
                  d="M27.4598 30.0594C30.6247 27.7979 32.6816 24.1345 32.6816 20C32.6816 13.1308 27.0039 7.56225 20 7.56225H19.254M20 32.4378C12.9961 32.4378 7.31836 26.8692 7.31836 20C7.31836 15.8655 9.37527 12.2022 12.5402 9.94064M18.508 35.218L21.492 32.2914L18.508 29.3649M21.492 10.6351L18.508 7.70858L21.492 4.78204"
                  stroke="#2954C2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M13.2891 25.0726V23.7629L16.3846 20.3567C16.6807 20.0212 16.9274 19.7231 17.1247 19.4624C17.3221 19.2018 17.4701 18.9493 17.5688 18.705C17.6675 18.4606 17.7169 18.2 17.7169 17.923C17.7169 17.607 17.653 17.3366 17.5253 17.1118C17.3976 16.8837 17.222 16.7078 16.9985 16.584C16.775 16.4602 16.521 16.3983 16.2366 16.3983C15.9434 16.3983 15.6865 16.4667 15.466 16.6036C15.2454 16.7371 15.0741 16.9277 14.9522 17.1753C14.8332 17.4229 14.7737 17.7178 14.7737 18.0599H13.2368C13.2368 17.4246 13.366 16.8723 13.6243 16.4032C13.8826 15.934 14.2382 15.5708 14.691 15.3134C15.1467 15.056 15.6691 14.9273 16.2583 14.9273C16.8563 14.9273 17.3816 15.0528 17.8344 15.3036C18.2872 15.5545 18.6384 15.8982 18.888 16.3348C19.1405 16.7713 19.2668 17.2698 19.2668 17.8302C19.2668 18.2049 19.2029 18.573 19.0752 18.9346C18.9475 19.2963 18.7226 19.697 18.4004 20.1368C18.0811 20.5767 17.6327 21.1093 17.0551 21.7349L15.5182 23.4893V23.5577H19.4018V25.0726H13.2891Z"
                  fill="#2954C2" />
                <path
                  d="M20.6738 23.2156V21.774L24.4572 15.0642H25.5282V17.1167H24.8752L22.3282 21.6469V21.7251H27.6093V23.2156H20.6738ZM24.9274 25.0726V22.7758L24.9448 22.1307V15.0642H26.4687V25.0726H24.9274Z"
                  fill="#2954C2" />
              </svg>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" v-else>
                <path
                  d="M27.4598 30.0594C30.6247 27.7979 32.6816 24.1345 32.6816 20C32.6816 13.1308 27.0039 7.56225 20 7.56225H19.254M20 32.4378C12.9961 32.4378 7.31836 26.8692 7.31836 20C7.31836 15.8655 9.37527 12.2022 12.5402 9.94064M18.508 35.218L21.492 32.2914L18.508 29.3649M21.492 10.6351L18.508 7.70858L21.492 4.78204"
                  stroke="#2954C2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.92 15.0641V25.0793H15.1057V16.8294H15.047L12.7046 18.3259V16.6632L15.1937 15.0641H16.92Z"
                  fill="#2854C2" />
                <path
                  d="M19.6006 25.0793V23.7687L23.0776 20.3602C23.4101 20.0244 23.6873 19.7261 23.9089 19.4653C24.1306 19.2045 24.2969 18.9518 24.4078 18.7073C24.5186 18.4628 24.574 18.202 24.574 17.9249C24.574 17.6086 24.5023 17.338 24.3589 17.1131C24.2154 16.8849 24.0182 16.7088 23.7671 16.5849C23.5161 16.461 23.2308 16.3991 22.9113 16.3991C22.5821 16.3991 22.2935 16.4676 22.0458 16.6045C21.798 16.7381 21.6056 16.9289 21.4687 17.1766C21.335 17.4244 21.2682 17.7195 21.2682 18.0618H19.542C19.542 17.426 19.687 16.8734 19.9772 16.404C20.2673 15.9345 20.6667 15.571 21.1753 15.3135C21.6871 15.0559 22.274 14.9271 22.9358 14.9271C23.6074 14.9271 24.1975 15.0526 24.7061 15.3037C25.2146 15.5547 25.6091 15.8987 25.8895 16.3355C26.1731 16.7724 26.315 17.2712 26.315 17.8319C26.315 18.2069 26.2432 18.5753 26.0998 18.9371C25.9563 19.299 25.7037 19.7 25.3418 20.1401C24.9832 20.5803 24.4795 21.1133 23.8307 21.7393L22.1044 23.4949V23.5633H26.4666V25.0793H19.6006Z"
                  fill="#2854C2" />
              </svg>
            </div>
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
      </div>
      <div v-else></div>

    </div>
    <footer>
      <p @click="showSupportAlert">Служба поддержки</p>
    </footer>
  </div>
  <div v-else-if="isLandscape" class="landscape">
    <div class="text">
      <h3>Поверните телефон</h3>
    </div>
    <div class="image">
      <img src="/catalog/view/theme/boschcenter/app/img/rotate.webp" alt="" style="max-width: 100%;">
    </div>
  </div>
  <div v-else-if="isDesktop" class="desktop">
    <div class="text">
      <h3>Откройте страницу на телефоне</h3>
      <p>Данная страница не работает на компьютере, зайдите с телефона, чтобы увидеть страницу.</p>
    </div>
    <div class="image">
      <img src="/catalog/view/theme/boschcenter/app/img/desk.webp" alt="" style="max-width: 100%;">
    </div>
  </div>
  <div v-if="showAlert" class="supportAlert">
    <h3>Служба поддержки</h3>
    <p>Держитесь... Мы с Вами!</p>
    <button @click="hideSupportAlert">Принять</button>
  </div>
</template>

<script>
import axios from 'axios';
import searchBar from './components/searchBar.vue';

export default {
  name: 'App',
  components: {
    searchBar,
  },
  data() {
    return {
      prodData: null,
      isLoading: false,
      error: null,
      errorMessage: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.',
      showLoanFor24: false,
      showAlert: false,
      isPortrait: false,
      isDesktop: false,
      isLandscape: false
    };
  },
  created() {
    this.checkOrientation();
    window.addEventListener('resize', this.checkOrientation);
  },
  unmounted() {
    window.removeEventListener('resize', this.checkOrientation);
  },

  methods: {
    handleProductSelected(productId) {
      this.fetchData(productId);
    },
    fetchData(productId) {
      this.isLoading = true;
      axios.post(`https://boschcenter.kz/index.php?route=api/product/getProduct/`, {
        product_id: productId,
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
    },
    // showSupportAlert() {
    //   this.showAlert = true;
    // },
    // hideSupportAlert() {
    //   this.showAlert = false;
    // }
    showSupportAlert() {
      window.alert('Служба поддержки\n\nДержитесь... Мы с Вами!');
    },
    checkOrientation() {
      this.isPortrait = window.matchMedia("(max-width: 768px) and (orientation: portrait)").matches;
      this.isLandscape = window.matchMedia("(max-width: 1023px) and (orientation: landscape)").matches;
      this.isDesktop = window.matchMedia("(min-width: 1024px)").matches && !this.isPortrait && !this.isLandscape;
    },
    clearProdData() {
      // Очистка данных в prodData
      this.prodData = null;
    },
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
<style>
@import "normalize.css";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  max-width: 100vw;
}
.desktop {
  max-width: 470px;
  margin: 80px auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.desktop .text h3 {
	font-size: 28px;
	font-weight: 700;
	margin-bottom: 16px;
}
.desktop .text p {
	font-size: 18px;
	font-weight: 400;
	margin: 0 0 40px;
	text-align: center;
}
.desktop .image img {
	max-width: 200px !important;
}
.application {
  height: calc(100vh - 184px);
  max-height: 100vh;
  max-width: 100vw;
  overflow-x: clip;
}
.landscape {
	max-width: 50%;
	margin: 50px auto;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
}
.landscape .text {
	font-size: 28px;
	font-weight: 700;
	margin-right: 10px;
}
.landscape img {
	max-height: 200px;
	height: 200px;
	width: auto;
	max-width: unset !important;
}
footer {
  position: static!important;
  bottom: 0!important;
  width: 100%!important;
  padding: 20px 16px!important;
  border-top: 1px solid #f0f0f0!important;
  max-width: 100vw!important;
  background-color: #fff;
}

footer p {
  margin: 0;
  font-size: 14px;
  color: #2854c2;
}

header {
  padding: 10px 24px;
  position: relative;
  background-color: #fff;
}

.topHeader {
  margin-bottom: 16px;
}
.changer {
	display: flex;
}
.logo img {
  max-height: 28px;
}

header {
  position: fixed!important;
  top: 0;
  left: 0;
  width: calc(100% - 48px);
}

#content {
  padding: 0 24px;
  min-height: calc(100vh - 184px);
  margin-top: 126px;
}

.searchErr {
  padding-top: 24px;
}

.img-wrap {
  margin:24px 0 16px;
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
.specs h3, #quantity h3 {
font-size: 20px;
}
.specs .specVal, #quantity .quant {
font-weight: 500 !important;
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
  align-items: center;
  gap: 12px;
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
  flex-flow: row wrap;
  align-items: center;
  gap: 5px 16px;
  margin-bottom: 16px;
}

#quantity {
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
  font-weight: 600;
  color: #029AAD;
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
}</style>
