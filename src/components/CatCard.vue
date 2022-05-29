<template>
<div class="cat-card">
  <img :src="image"/>
</div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
    }
  }
}
</script>

<style lang="scss" scoped>
.cat-card {
  background: blue;
  width: 225px;
  height: 225px;

  img {
    width: 225px;
    height: 225px;
  }
}
</style>