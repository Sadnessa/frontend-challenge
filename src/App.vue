<template>
  <div class="main-page">
    <Header :tabs="tabs" :activeTab="currentTab" @tabClick="onTabClick" />
    <div class="content">
      <CatCard v-for="(cat, i) in cats" :key="i" :image="cat.url"/>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import CatCard from "./components/CatCard.vue";
import axios from 'axios';

export default {
  components: {
    Header,
    CatCard,
  },

  data() {
    return {
      cats: [],
      tabs: ["Все котики", "Любимые котики"],
      currentTab: "Все котики",
    };
  },

  created() {
    this.loadNextImage();
  },

  methods: {
    async loadNextImage() {
      try {
        axios.defaults.headers.common["x-api-key"] = "fbcc2541-6b27-4b7b-82f3-9b72d7a5da66"; // Replace this with your API Key

        let response = await axios.get(
          "https://api.thecatapi.com/v1/images/search",
          { params: { limit: 10, } }
        ); // Ask for 1 Image, at full resolution

        this.cats = response.data; // the response is an Array, so just use the first item as the Image

        console.log("-- Image from TheCatAPI.com");
        console.log("id:", this.cats.id);
        console.log("url:", this.cats.url);
        console.log(response)
      } catch (err) {
        console.log(err);
      }
    },

    onTabClick(i) {
      this.currentTab = i;
    },
  },
};
</script>

<style>
body {
  margin: 0px;
}
</style>

<style lang="scss" scoped>
.main-page {
  .header {
    position: sticky;
  }
  .content {
    display: flex;
    padding: 48px 62px;
  }
}
</style>
