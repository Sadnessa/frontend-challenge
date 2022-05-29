<template>
  <div class="header">
    <div class="tab" v-for="(tab, i) in tabs" :key="i" @click="onClick(tab)" :class="this.activeTab === tab ? 'tab--active' : ''">
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
    }
  },


  methods: {
    onClick(tabName) {
      this.$emit('tabClick', tabName)
    }
  },  
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: 64px;
  background: #2196F3;
  padding-left: 62px;
  box-shadow: 0px 4px 4px 0px #0000003D;

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0px 20px;
    color: rgba(255, 255, 255, 0.7);

    &--active {
      color: white;
      background: #1E88E5;
    }
  }
}
</style>