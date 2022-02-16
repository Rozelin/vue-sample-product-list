<template>
  <div class="filter">
    <div
      :class="[{ opened: filterOpened }, 'filter-toggle']"
      tabindex="0"
      role="button"
      @click="openFilters"
      @keyup.enter="openFilters"
    >
      {{ 'Filter products' }}
      <icon :name="filterOpened ? 'chevron-up' : 'chevron-down'" :size="15"/>
    </div>
    <div
      v-if="filterOpened"
      class="filter-options"
    >
      <filter-unit
        v-for="(filterKey, index) in availableFilters"
        :key="index"
        :filter-key="filterKey"
        @change="applyFilter($event, filterKey)"
      />
    </div>
  </div>
</template>
<script>
import Icon from './Icon';
import Range from './formElements/Range';
import FilterUnit from './FilterUnit';
import config from 'config';

export default {
  name: 'ProductFilters',
  components: {
    Icon,
    Range,
    FilterUnit,
  },
  props: {},
  data() {
    return {
      filterOpened: false,
      filters: {
        price: {},
        size: [],
      },
    };
  },
  computed: {
    availableFilters() {
      return Object.keys(this.$store.getters['getAvailableFilters']);
    },
    getPriceRange () {
      const filters = this.$store.getters['getAvailableFilters'];
      if (filters && filters.price) {
        return filters.price;
      }
    },
  },
  methods: {
    getCurrentFilters(filterType) {
      const filter = config.filter_attributes.find(filter => filter.type === filterType);
      return filter.value;
    },
    openFilters() {
      this.filterOpened = !this.filterOpened;
    },
    applyFilter($event, type) {
      const filter = {
        type,
        value: $event.value,
        input: $event.type,
      };
      this.$store.dispatch('filterProducts', filter);
    }
  }
}
</script>

<style lang="scss">
@import "src/scss/_colors.scss";
@import "src/scss/typography/_text.scss";

.filter {
  position: relative;
  min-width: 200px;

  &-toggle {
    @include text-plain-medium;
    padding: 9px 40px 9px 15px;
    width: 100%;
    border: 3px solid $color-lightgrey;
    border-radius: 2px;
    background: $color-white;
    letter-spacing: 0;
    cursor: pointer;
    transition: all 150ms ease;

    .icon {
      position: absolute;
      right: 12px;
      top: 15px;
      width: 10px;
      height: 6px;
      stroke-width: 2px;
      stroke: $color-darkgrey;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      pointer-events: none;
    }
  }

  &-unit {
    margin-bottom: 15px;
    padding-top: 10px;
    border-top: 1px solid $color-lightgrey;
  }
  &-label {
    @include text-bold;
    display: block;
    margin-bottom: 5px;
  }

  &-options {
    @include text-plain-medium;
    position: absolute;
    top: 35px;
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    border-right: 3px solid $color-lightgrey;
    border-bottom: 3px solid $color-lightgrey;
    border-left: 3px solid $color-lightgrey;
    border-radius: 4px;
    background-color: $color-white;
    padding: 15px;
    overflow-x: hidden;
    z-index: 1;
  }
}
</style>
