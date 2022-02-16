<template>
  <div id="app">
    <top-bar/>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <footer-bar/>
  </div>
</template>
<script>
import TopBar from './components/TopBar.vue';
import FooterBar from './components/FooterBar.vue';

export default {
  components: {
    TopBar,
    FooterBar,
  },
  async created() {
    await this.$store.dispatch('setProductList');
  }
}
</script>
<style lang="scss">
  @import "src/scss/_colors.scss";

  #app {
    display: flex;
    min-height: 100vh;
    padding-top: 100px;
    flex-direction: column;
    background-color: $color-background;
  }

  .fade-enter { opacity: 0;  }
  .fade-enter-active { transition: opacity .5s;  }
  .fade-leave-active { transition: opacity .5s;    opacity: 0; }
</style>
<style lang="scss" src="../src/scss/main.scss"/>
