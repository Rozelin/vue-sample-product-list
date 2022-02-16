<template>
  <div class="base-checkbox">
    <label
      :class="[{ checked }, 'base-checkbox-label']"
      :for="id"
      tabindex="0"
      @keypress.enter="$emit('change', value)"
    >
      <icon
        :name="checked ? 'checkbox-checked' : 'checkbox'"
        :size="20"
        class="base-checkbox-icon"
      />
      <input
        :id="id"
        :name="name"
        :value="value"
        type="checkbox"
        :checked="checked"
        @change="$emit('change', $event.target.value)"
        @keypress.enter="$emit('change', $event.target.value)"
      >
      {{ label }}
    </label>
  </div>
</template>

<script>
import Icon from '../Icon';

export default {
  name: 'BaseCheckbox',
  components: {
    Icon,
  },
  props: {
    id: {
      type: String,
      required: true,
      default: ''
    },
    name: {
      type: String,
      required: true,
      default: ''
    },
    value: {
      type: String,
      required: true,
      default: ''
    },
    label: {
      type: String,
      required: true,
      default: ''
    },
    checked: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
}
</script>

<style lang="scss">
@import "src/scss/_colors.scss";
@import "src/scss/typography/_text.scss";

.base-checkbox {
  input[type='checkbox'] {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  &-label {
    position: relative;
    display: flex;
    margin: 10px 0;
    cursor: pointer;
    user-select: none;

    &:hover,
    &.checked {
      color: $color-primary;
    }
  }

  &-icon {
    cursor: pointer;
    margin-right: 5px;
  }
}
</style>
