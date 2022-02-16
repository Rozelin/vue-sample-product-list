<template>
  <nav class="navbar container">
    <router-link to="/">
      <img
          src="@app/assets/logo.png"
          alt="Rozumna Olena"
          title="Rozumna Test Task"
          width="40px"
          class="navbar-logo"
      >
    </router-link>
    <router-link to="/" class="navbar-link decorated" title="Product list">
      {{ 'Products' }}
    </router-link>
    <router-link to="/contact-form" class="navbar-link contact" title="Contact form">
      {{ 'Contact us' }}
    </router-link>

    <div class="navbar-wishlist">
      <icon
          name="heart-full"
          :size="26"
      />
      <span class="navbar-wishlist-total">{{ totalWishlist }}</span>
    </div>
  </nav>
</template>
<script>
import Icon from './Icon.vue';

export default {
  name: 'TopBar',
  components: {
    Icon,
  },
  computed: {
    totalWishlist() {
      return this.$store.getters.getAllProducts.filter(({ isFav }) => isFav).length;
    }
  },
}
</script>
<style scoped lang="scss">
@import "src/scss/_colors.scss";
@import "src/scss/typography/_text.scss";

.navbar {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 20px 16px;
  background-color: rgba(245, 245, 245, .7);
  z-index: 1;

  @media (max-width: 768px) {
    padding: 10px 20px;
  }

  &-logo {
    display: block;
    margin-right: 20px;
  }

  &-contact {
    color: $color-secondary;
    &:hover {
      color: $color-primary;
    }
  }

  &-link {
    @include text-fancy-medium;
    text-decoration: none;
    color: $color-secondary;

    @media (max-width: 768px) {
      @include text-fancy-small;
    }

    &.router-link-exact-active {
      color: $color-primary;
    }

    &:hover {
      color: $color-primary;
    }

    &.decorated {
      border-right: 2px solid $color-secondary;
      padding-right: 10px;
      margin-right: 10px;
    }
  }

  &-wishlist {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    background-color: $color-white;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    opacity: .8;

    &-total {
      @include text-fancy-mini;
      @include text-bold;
      position: absolute;
      top: -7px;
      right: -7px;
      min-width: 26px;
      text-align: center;
      font-size: 14px;
      height: 26px;
      padding: 2px;
      border-radius: 50%;
      line-height: 20px;
      background-color: $color-white;
      border: 1px solid $color-primary;
    }

    .icon {
      color: $color-primary;
    }
  }
}
</style>
