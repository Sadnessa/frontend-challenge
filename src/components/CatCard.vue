<template>
  <div class="cat-card">
    <div class="img-wrapper">
      <img class="cat-image" :src="cat.url" />
    </div>

    <Heart :isClicked="isFeatured" @click="$emit('heartClick', cat)" />
    <slot />
  </div>
</template>

<script>
import Heart from "../components/Heart.vue";

export default {
  components: {
    Heart,
  },

  props: {
    cat: {
      type: Object,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.cat-card {
  width: 225px;
  height: 225px;
  padding: 16px;
  position: relative;

  .img-wrapper {
    width: 225px;
    height: 225px;
    overflow: hidden;
    outline: white 16px solid;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cat-image {
    max-width: 180%;
    max-height: 180%;
    min-height: 100%;
    object-fit: cover;
  }

  .heart-img {
    position: absolute;
    bottom: 60px;
    right: 60px;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
    transition: all ease-in-out 0.2s;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 94px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 58.85%
    );
    opacity: 0;
    transition: all ease-in-out 0.2s;
  }

  &:hover {
    box-shadow: 0px 9px 18px 0px #0000002e;
    box-shadow: 0px 6px 5px 0px #0000003d;

    &::after {
      opacity: 1;
    }

    .heart-img {
      opacity: 1;
    }
  }
}
</style>
