<template>
  <div :class="isGrid ? 'col-l-4 col-m-6 col-s-12' : 'col-l-12 col-m-12 col-s-12'">
    <router-link
        :to="product.url"
        :class="[{ 'list-layout': !isGrid }, 'product-tile']"
        :title="product.name"
    >
      <add-to-wishlist
          :in-wishlist="product.isFav"
          :product-id="product._id"
      />
      <product-image
          :title="product.name"
          :src="getProductImage"
      />
      <div class="product-details">
        <div class="product-title">{{ product.name | capitalize }}</div>
        <div class="flex">
          <span class="product-size">{{ product.size }}</span>
          <rating-stars :rating="product.rating"/>
        </div>
        <div class="product-price">
          <span class="product-price__regular">{{ product.price | price }}</span>
          <span v-if="product.oldPrice" class="product-price__old">{{ product.oldPrice | price }}</span>
          <span v-if="product.savings" class="product-price__saving">{{ 'You save'}} {{ product.savings | price }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
import config from 'config';
import ProductImage  from '@app/components/ProductImage';
import AddToWishlist from '@app/components/AddToWishlist';
import RatingStars   from '@app/components/RatingStars';

export default {
  name: 'ProductTile',
  components: {
    ProductImage,
    AddToWishlist,
    RatingStars,
  },
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    isGrid: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  computed: {
    getProductImage() {
      return this.product.picture || config.imgPlaceholder;
    }
  },
};
</script>
<style lang="scss" scoped>
  @import "src/scss/_colors.scss";
  @import "src/scss/typography/_text.scss";

  .product {
    &-tile {
      position: relative;
      display: block;
      text-decoration: none;
      color: $color-secondary;
      background-color: $color-white;
      box-shadow: 0 0 10px -3px rgba(0, 0, 0, .3);
      cursor: pointer;
      transition: all .2s ease-in;

      &.list-layout {
        @media (min-width: 568px) {
          display: flex;
          .product-image {
            width: auto;
            max-width: 30%;
          }
        }
      }

      &:hover {
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, .3);
      }
    }

    &-details {
      padding: 15px 20px 35px;
    }

    &-title {
      @include text-fancy-mini;
      margin-bottom: 10px;
    }

    &-size {
      @include text-plain-medium;
      margin-right: 5px;
    }

    &-price {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      align-items: flex-end;

      &__regular {
        @include text-fancy-medium;
        @include text-bold;
        margin-right: 10px;
      }

      &__old {
        @include text-fancy-mini;
        display: inline-block;
        position: relative;
        color: $color-darkgrey;
        margin-right: 10px;

        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          right: 0;
          left: 0;
          height: 1px;
          background-color: $color-darkgrey;
        }
      }

      &__saving {
        @include text-fancy-mini;
        color: $color-primary;
      }
    }
  }
</style>
