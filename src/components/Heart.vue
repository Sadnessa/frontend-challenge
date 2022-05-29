<template>
  <div class="heart-img">
    <img class="default" src="../assets/Heart.svg" />
    <img class="hovered" src="../assets/HoveredHeart.svg" />
    <img class="clicked" src="../assets/ClickedHeart.svg" v-if="isClicked" />
  </div>
</template>

<script>
export default {
  props: {
    isClicked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.heart-img {
  * {
    position: absolute;
  }
  .default {
    opacity: 1;
  }
  .hovered {
    opacity: 0;
  }

  &:hover {
    .hovered {
      opacity: 1;
    }

    .default {
      opacity: 0;
    }
  }
}
</style>
