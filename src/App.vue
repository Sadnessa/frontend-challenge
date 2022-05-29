<template>
  <div class="main-page">
    <Header :tabs="tabs" :activeTab="currentTab" @tabClick="onTabClick" />
    <div class="content content__all" v-if="currentTab == 'Все котики'">
      <CatCard
        v-for="(cat, i) in allCats"
        :key="i"
        :cat="cat"
        @heartClick="onHeartClick"
        :isFeatured="isCatFeatured(cat)"
      />
    </div>
    <div class="content content__featured" v-else>
      <div class="notification" v-if="featuredCats.length == 0">
        Нужно добавить любимых котиков!
      </div>
      <CatCard
        v-for="(cat, i) in featuredCats"
        :key="i"
        :cat="cat"
        @heartClick="onHeartClick"
        :isFeatured="isCatFeatured(cat)"
      />
    </div>
    <div class="load" v-if="isLoading">
      <p>...загружаем еще котиков...</p>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import CatCard from "./components/CatCard.vue";
import axios from "axios";

export default {
  components: {
    Header,
    CatCard,
  },

  data() {
    return {
      allCats: [],
      featuredCats: [],
      tabs: ["Все котики", "Любимые котики"],
      currentTab: "Все котики",
      isLoading: false,
    };
  },

  created() {
    this.loadImages();
  },

  mounted() {
    window.addEventListener("scroll", () => {
      let scrollMaxY = document.body.scrollHeight;
      if (window.scrollY + window.innerHeight + 10 >= scrollMaxY) {
        this.loadNewCats();
      }
    });
  },

  methods: {
    async loadImages() {
      try {
        axios.defaults.headers.common["x-api-key"] =
          "fbcc2541-6b27-4b7b-82f3-9b72d7a5da66"; 

        let response = await axios.get(
          "https://api.thecatapi.com/v1/images/search",
          { params: { limit: 15 } }
        ); 
        this.allCats = response.data; 
      } catch (err) {
        console.log(err);
      }
    },

    onTabClick(i) {
      this.currentTab = i;
    },

    onHeartClick(cat) {
      if (this.isCatFeatured(cat)) {
        this.featuredCats = this.featuredCats.filter((c) => {
          return c !== cat;
        });
      } else {
        this.featuredCats.push(cat);
      }
    },

    isCatFeatured(cat) {
      return Boolean(this.featuredCats.find((c) => c.id === cat.id));
    },

    async loadNewCats() {
      if (this.isLoading) {
        return;
      }

      try {
        axios.defaults.headers.common["x-api-key"] =
          "fbcc2541-6b27-4b7b-82f3-9b72d7a5da66"; 

        this.isLoading = true;

        let response = await axios.get(
          "https://api.thecatapi.com/v1/images/search",
          { params: { limit: 15 } }
        ); 

        this.allCats.push(...response.data); 
      } catch (err) {
        console.log(err);
      }

      this.isLoading = false
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .header {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 24px 38px;

    .cat-card {
      margin: 12px;
    } 
  }
}
</style>
