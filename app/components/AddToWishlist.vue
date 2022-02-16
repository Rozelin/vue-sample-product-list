<template>
  <div class="wishlist-btn">
    <icon
      class="wishlist-icon"
      :name="inWishlist ? 'heart-full' : 'heart'"
      :size="26"
      @click="addToWishlist"
    />
  </div>
</template>

<script>
import Icon from "./Icon";

export default {
  name: 'AddToWishlist',
  components: {
    Icon
  },
  props: {
    inWishlist: {
      type: Boolean,
      required: false,
      default: false,
    },
    productId: {
      type: String,
      required: true,
      default: '',
    }
  },
  methods: {
    addToWishlist() {
      this.$store.dispatch('addToWishlist', { productId: this.productId, value: !this.inWishlist })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/_colors.scss";

.wishlist {
  &-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: $color-white;
    cursor: pointer;
    height: 36px;
    width: 36px;
    padding: 6px 5px 4px;
    border-radius: 50%;
  }

  &-icon {
    color: $color-primary;
    opacity: 0.7;
  }
}
</style>
