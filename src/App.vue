<template>
  <Transition name="fade-main" appear>
    <div class="main-page">
      <Header :tabs="tabs" :activeTab="currentTab" @tabClick="onTabClick" />
      <Transition name="fade" mode="out-in">
        <div class="content content__all" v-if="currentTab == 'Все котики'">
          <TransitionGroup name="list">
            <CatCard
              v-for="(cat, i) in allCats"
              :key="i"
              :cat="cat"
              @heartClick="onHeartClick"
              :isFeatured="isCatFeatured(cat)"
            />
          </TransitionGroup>
        </div>
        <div class="content content__featured" v-else>
          <div class="notification" v-if="featuredCats.length == 0">
            <p>Коллекция любимых котиков не найдена.</p>
            <p>:с</p>
          </div>
          <TransitionGroup name="list">
            <CatCard
              v-for="(cat, i) in featuredCats"
              :key="i"
              :cat="cat"
              @heartClick="onHeartClick"
              :isFeatured="isCatFeatured(cat)"
          /></TransitionGroup>
        </div>
      </Transition>
      <div class="load-cats" v-if="isLoadingCats">
        <p>...загружаем еще котиков...</p>
        <Loader />
      </div>
    </div>
  </Transition>

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

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

body {
  margin: 0px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}
</style>

<style lang="scss" scoped>
@media only screen and (max-width: 899px) {
  .cat-card {
    width: 150px;
    height: 150px;
    margin: 4px;
  }

  .content {
    padding: 24px 10px;
  }
}

@media only screen and (max-width: 500px) {
  .cat-card {
    width: 90px;
    height: 90px;
    margin: 4px;
  }

  .content {
    padding: 24px 10px;
  }
}

@media only screen and (min-width: 900px) {
  .content {
    padding: 24px 38px;
  }

  .cat-card {
    margin: 12px;
  }
}
.main-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    position: sticky;
    top: 0;
    z-index: 2;
  }
  .content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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

//animations
//1
.fade-main-enter-active,
.fade-main-leave-active {
  transition: opacity 0.5s ease;
}

.fade-main-enter-from,
.fade-main-leave-to {
  opacity: 0;
}


//2
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


//3
.list-move,
.list-enter-active,
.list-leave-to,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-to,
.list-leave-active {
  opacity: 0;
  position: absolute;
  transform: translateX(30px);
}
</style>
