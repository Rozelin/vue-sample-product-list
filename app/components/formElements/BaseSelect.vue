<template>
  <label :for="id" class="select">
    <select
      :id="id"
      :name="name"
      tabindex="0"
      aria-label="Sort products bu value"
      title="Sort products bu value"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event)"
      @input="$emit('input', $event)"
    >
      <option
        v-if="!selected"
        disabled
        selected
        value
      >
        {{ placeholder }}
      </option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        v-bind="{ selected: option.value === selected }"
      >
        {{ `Sort By: ${option.label}` }}
      </option>
    </select>
    <span class="select-icon">
      <icon name="chevron-up" :size="10"/>
      <icon name="chevron-down" :size="10"/>
    </span>

  </label>
</template>
<script>
import Icon from '../Icon';

export default {
  name: 'BaseSelect',
  components: {
    Icon,
  },
  props: {
    id: {
      type: String,
      required: true,
      default: 'select'
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    selected: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    }
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/_colors.scss";
@import "src/scss/typography/_text.scss";

.select {
  @include text-plain-micro;
  position: relative;
  min-width: 200px;

  &-icon {
    position: absolute;
    right: 12px;
    top: 9px;
    width: 10px;
    height: 6px;
    stroke-width: 2px;
    stroke: $color-darkgrey;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
  }

  select {
    -webkit-appearance: none;
    padding: 10px 40px 10px 15px;
    width: 100%;
    border: 3px solid $color-lightgrey;
    border-radius: 2px;
    background: $color-white;
    cursor: pointer;
    font-family: inherit;
    transition: all 150ms ease;
  }

  option {
    color: $color-secondary;

    &:focus {
      outline: none;
      border-color: $color-lightgrey;
    }

    &:hover + svg {
      stroke: $color-darkgrey;
    }
  }
}
</style>
