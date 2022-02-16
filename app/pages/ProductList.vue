<template>
  <div class="container">
    <div class="flex products-top">

      <span class="products-total">{{ `${totalProducts} results` }}</span>

      <grid-toggle @toggle="$event => this.isGrid = $event"/>

      <product-filter class="products-filter"/>

      <base-select
          id="sorting"
          name="sorting"
          class="products-filter"
          :options="sortingAttributes"
          placeholder="Sort Products By"
          @change="setSorting"
      />
    </div>
    <div class="row">
      <product-tile
          v-for="(product, index) in currentProducts"
          :key="index"
          :product="product"
          :is-grid="isGrid"
      />
    </div>
  </div>
</template>
<script>
// TODO: Add lazy loading for images
// Implement pagination or 'Load more' functionality
// Add 'Scroll to top' button
// Hide/show fixed header on scrolling

import Icon from '@app/components/Icon.vue';
import ProductTile from '@app/components/ProductTile';
import BaseSelect from '@app/components/formElements/BaseSelect';
import ProductFilter from '@app/components/ProductFilter';
import GridToggle from '@app/components/GridToggle';
import config from 'config';

export default {
  name: 'ProductList',
  components: {
    ProductTile,
    Icon,
    BaseSelect,
    ProductFilter,
    GridToggle,
  },
  computed: {
    currentProducts() {
      return this.$store.getters['getCurrentProductList'];
    },
    totalProducts() {
      return this.currentProducts.length;
    },
    sortingAttributes() {
      return config.sorting_attributes;
    }
  },
  data() {
    return {
      isGrid: true
    };
  },
  methods: {
    setSorting($event) {
      this.$store.dispatch('sortProducts', $event.target.value);
    },
  },
}
</script>
<style lang="scss" scoped>
@import "src/scss/_colors.scss";
@import "src/scss/typography/_text.scss";

.products {
  &-total {
    @include text-fancy-medium;
    @include text-bold;
    color: $color-secondary;
    line-height: 40px;
    margin-right: auto;

    @media (max-width: 768px) {
      @include text-fancy-small;
      line-height: 40px;
    }
  }

  &-filter {
    margin-left: 40px;
    @media (max-width: 768px) {
      margin-left: 0;
      margin-bottom: 20px;
    }
  }

  &-top {
    margin-bottom: 20px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
}
</style>
