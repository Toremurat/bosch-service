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
</template>

<script>
import searchBar from './components/searchBar.vue';

export default {
  name: 'App',
  components: {
    searchBar,
  },
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
header {
	padding: 10px 24px;
  position: relative;
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
