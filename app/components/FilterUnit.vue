<template>
  <div class="filter-unit">
    <span class="filter-label">{{ filter.label }}</span>
    <div class="filter-item"
       v-if="filter.input_type === 'range'"
    >
      <range
        :step="10"
        :min="getRangeValue[0]"
        :max="getRangeValue[1]"
        :value="rangeValue(filter.type)"
        @change="$emit('change', { value: $event, type: filter.input_type })"
      />
      <div class="filter-price-label">{{ getPriceLabel() }}</div>
    </div>
    <div
      v-if="filter.input_type === 'checkbox'"
      class="filter-item"
    >
      <base-checkbox
        v-for="(filterKey, index) in filter.value"
        :id="`checkbox-${index}`"
        :key="index"
        :label="filter.option_labels[filterKey]"
        :value="filterKey"
        :name="filterKey"
        :checked="isSelected(filterKey, filter.type)"
        @change="$emit('change', { value: $event, type: filter.input_type })"
      />
    </div>
  </div>
</template>
<script>
import BaseCheckbox from './formElements/BaseCheckbox';
import Range from './formElements/Range'
import config from 'config';

export default {
  name: 'FilterUnit',
  components: {
    Range,
    BaseCheckbox,
  },
  computed: {
    getRangeValue() {
      const currentFilter = this.$store.getters['getAvailableFilters'];
      return currentFilter[this.filter.type] || [0,0];
    }
  },
  props: {
    filterKey: {
      type: String,
      required: true,
      default: '',
    }
  },
  data() {
    return {
      filter: {},
    };
  },
  methods: {
    rangeValue(type) {
      return this.$store.getters.getCurrentFilters[type];
    },
    isSelected(value, type) {
      return this.$store.getters.getCurrentFilters[type].includes(value);
    },
    getPriceLabel() {
      const currentPrice = this.$store.getters['getCurrentFilters']['price'];
      const currency = config.currencySign;
      return `${currency}${currentPrice[0]} - ${currency}${currentPrice[1]}`;
    }
  },
  created() {
    this.filter = config.filter_attributes.find(filter => {
      return filter.type === this.filterKey;
    });
  },
};
</script>

<style lang="scss" scoped>
.filter {
  &-price-label {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
