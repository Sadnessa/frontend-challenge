<template>
  <div class="header">
    <div
      class="tab"
      v-for="(tab, i) in tabs"
      :key="i"
      @click="onClick(tab)"
      :class="this.activeTab === tab ? 'tab--active' : ''"
    >
      {{ tab }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },

    activeTab: {
      type: String,
    },
  },

  methods: {
    onClick(tabName) {
      this.$emit("tabClick", tabName);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
  height: 64px;
  background: #2196f3;
  padding-left: 62px;
  box-shadow: 0px 4px 4px 0px #0000003d;
  box-sizing: border-box;

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0px 20px;
    color: rgba(255, 255, 255, 0.7);
    transition: all ease-in-out 0.3s;

    &:first-child {
      margin-right: 4px;
    }

    &:hover {
      color: white;
      text-shadow: 0 0 9px #fff, 2px -11px 2px rgba(206, 89, 55, 0);
    }

    &--active {
      color: white;
      background: #1e88e5;
    }
  }
}
</style>
