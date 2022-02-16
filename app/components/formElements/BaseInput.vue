<template>
  <div class="base-input">
    <input
      :id="id"
      :name="name"
      :type="type"
      :value="value"
      :autocomplete="autocomplete"
      :disabled="disabled"
      class="base-input-field"
      :class="{'non-empty': !!value}"
      @input="setValue"
      @change="setValue"
      @blur="setValue"
    >
    <label
      class="base-input-label"
      :class="{ invalid: errorMsg }"
      v-if="placeholder"
      :for="id">
        {{ placeholder }}
      <span v-if="required" class="asterisk">*</span>
    </label>
    <div
      v-if="errorMsg"
      class="base-input-error">
        {{ errorMsg }}
    </div>
  </div>
</template>
<script>
import { validateField } from '@app/helpers';

export default {
  name: 'BaseInput',
  props: {
    id: {
      type: String,
      required: true,
      default: 'text',
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    autocomplete: {
      type: String,
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      errorMsg: '',
      value: '',
    };
  },
  methods: {
    validateInput() {
      if (!this.value.trim()) {
        this.errorMsg = 'This field is required';
        return;
      }
      const validationStatus = validateField(this.type, this.value);
      if (validationStatus && validationStatus.message) {
        this.errorMsg = validationStatus.message;
        this.$emit('input', '')
        return false;
      } else {
        this.errorMsg = '';
        this.$emit('input', this.value)
      }
    },
    setValue($event) {
      this.value = $event.target.value;
      this.validateInput(this.value);
    }
  }
}
</script>

<style lang="scss">
@import "src/scss/_colors.scss";
@import "src/scss/typography/_text.scss";

.base-input {
  position: relative;
  margin-bottom: 30px;
  width: 100%;

  &-label {
    @include text-fancy-mini;
    color: $color-secondary;
    position: absolute;
    top: 10px;
    left: 0;
    opacity: 0.7;
    transition: all .1s ease-in;

    .asterisk {
      color: $color-primary;
    }
  }

  &-field {
    @include text-fancy-small;
    color: $color-secondary;
    width: 100%;
    line-height: 25px;
    padding: 8px 0;
    height: 40px;
    box-sizing: border-box;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid $color-secondary;

    &:focus {
      outline: none;
      border: none;
      padding: 8px 0 7px;
      border-bottom: 2px solid $color-secondary;
    }

    &:focus + label,
    &.non-empty + label {
      font-size: 10px;
      top: -2px;
    }

    &.invalid {
      border-bottom-color: $color-primary;
    }

    &.invalid + label {
      color: $color-primary;
    }
  }

  &-error {
    @include text-plain-mini;
    position: absolute;
    top: 40px;
    color: $color-primary;
    margin-top: 3px;
  }
}
</style>
