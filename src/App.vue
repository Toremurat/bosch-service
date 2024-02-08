<template>
  <header>
    <div class="topHeader">
      <div class="logo">
        <img src="@/assets/logo.webp" alt="">
      </div>
    </div>
    <div class="bottomHeader">
      <searchBar />
    </div>
  </header>
  <div id="content">
    <router-view />
  </div>
  <footer>
    <p @click="showSupportAlert">Служба поддержки</p>
  </footer>
  <div v-if="showAlert" class="supportAlert">
      <h3>Служба поддержки</h3>
      <p>Держитесь... Мы с Вами!</p>
      <button @click="hideSupportAlert">Принять</button>
    </div>
</template>

<script>
import searchBar from './components/searchBar.vue';

export default {
  name: 'App',
  components: {
    searchBar,
  },
  data() {
    return {
      showAlert: false
    };
  },
  methods:{
    // showSupportAlert() {
    //   this.showAlert = true;
    // },
    // hideSupportAlert() {
    //   this.showAlert = false;
    // }
    showSupportAlert() {
      window.alert('Служба поддержки\n\nДержитесь... Мы с Вами!');
    }
  }
};
</script>

<style>
@import "normalize.css";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
body {
	margin: 0;
  padding:0;
  font-family: 'Inter', sans-serif;
}
#app{
  height: 100vh;
}
footer {
  position: sticky;
  top: 100%;
  width: 100%;
  padding: 20px 16px;
  border-top: 1px solid #f0f0f0;
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
.logo img {
	max-height: 28px;
}
#content {
  padding: 24px;
}
header {
  position: sticky;
  top: 0;
  left: 0;
}
</style>
