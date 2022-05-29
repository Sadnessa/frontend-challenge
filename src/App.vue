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
        <p>Коллекция любимых котиков не найдена.</p>
        <p>:с</p>
      </div>
      <CatCard
        v-for="(cat, i) in featuredCats"
        :key="i"
        :cat="cat"
        @heartClick="onHeartClick"
        :isFeatured="isCatFeatured(cat)"
      />
    </div>
    <div class="load-cats" v-if="isLoadingCats">
      <p>...загружаем еще котиков...</p>
      <Loader />
    </div>
  </div>

  <div class="load-page" v-if="isLoadingPage">
    <Loader />
  </div>
</template>

<script>
import axios from "axios";

import Header from "./components/Header.vue";
import CatCard from "./components/CatCard.vue";
import Loader from "./components/Loader.vue";

export default {
  components: {
    Header,
    CatCard,
    Loader,
  },

  data() {
    return {
      allCats: [],
      featuredCats: [],
      tabs: ["Все котики", "Любимые котики"],
      currentTab: "Все котики",
      isLoadingCats: false,
      isLoadingPage: false,
    };
  },

  created() {
    this.loadImages();
  },

  mounted() {
    //scroll loading feature
    window.addEventListener("scroll", () => {
      let scrollMaxY = document.body.scrollHeight;
      if (window.scrollY + window.innerHeight + 10 >= scrollMaxY) {
        this.loadNewCats();
      }
    });

    //local storage for featured cats
    if (localStorage.getItem("featuredCats")) {
      this.featuredCats =
        JSON.parse(localStorage.getItem("featuredCats")) || [];
    }
  },

  //local storage for featured cats
  watch: {
    featuredCats: {
      handler(newValue) {
        localStorage.setItem("featuredCats", JSON.stringify(newValue));
      },
      deep: true,
    },
  },

  methods: {
    async loadImages() {
      if (this.isLoadingPage) {
        return;
      }

      try {
        axios.defaults.headers.common["x-api-key"] =
          "fbcc2541-6b27-4b7b-82f3-9b72d7a5da66";

        this.isLoadingPage = true;

        let response = await axios.get(
          "https://api.thecatapi.com/v1/images/search",
          { params: { limit: 15 } }
        );

        this.allCats.push(...response.data);
      } catch (err) {
        console.log(err);
      }

      this.isLoadingPage = false;
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
      if (this.isLoadingCats) {
        return;
      }

      try {
        axios.defaults.headers.common["x-api-key"] =
          "fbcc2541-6b27-4b7b-82f3-9b72d7a5da66";

        this.isLoadingCats = true;

        let response = await axios.get(
          "https://api.thecatapi.com/v1/images/search",
          { params: { limit: 15 } }
        );

        this.allCats.push(...response.data);
      } catch (err) {
        console.log(err);
      }

      this.isLoadingCats = false;
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

  .load-cats {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;

    p {
      margin: 0px;
      margin-bottom: 20px;
    }
  }
}

.load-page {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
}

.notification {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 50%;
  top: 350%;
  transform: translateX(-50%);

  * {
    margin: 0px;

    &:first-child {
      margin-bottom: 10px;
    }
  }
}
</style>
