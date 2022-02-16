<template>
  <footer class="footer container">
    <router-link to="/" class="footer-link" title="Product list">
      {{ 'Products' }}
    </router-link>
    <router-link to="/contact-form" class="footer-link contact" title="Contact form">
      {{ 'Contact us' }}
    </router-link>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar',
};
</script>

<style lang="scss" scoped>
  @import "src/scss/_colors.scss";
  @import "src/scss/typography/_text.scss";

  .footer {
    @include text-fancy-medium;
    padding: 20px;
    margin-top: auto;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
      @include text-fancy-small;
    }

    &-link {
      color: $color-secondary;
      text-decoration: none;

      &:not(:last-child) {
        border-right: 2px solid $color-secondary;
        padding-right: 10px;
        margin-right: 10px;
      }

      &.router-link-exact-active {
        color: $color-primary;
      }
    }
  }
</style>
