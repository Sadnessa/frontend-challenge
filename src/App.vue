<template>
<div class="main-page">
  <Header/>
  <div class="content">
    <CatCard/>
  </div>

</div>

</template>

<script>
import Header from './components/Header.vue';
import CatCard from './components/CatCard.vue';

export default {
  components: {
    Header,
    CatCard,
  }
}
</script>

<style>
body {
  margin: 0px;
}
</style>

<style lang="scss" scoped>
.content {
  display: flex;
}

</style>