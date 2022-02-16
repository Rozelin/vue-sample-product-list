<template>
  <div
    class="icon"
    :style="{ width: size + 'px', height: size + 'px' }"
    @click="$emit('click')"
  >
    <svg
      :class="`icon-${name}`"
      :width="`${size}px`"
      :height="`${size}px`"
      :fill="color"
    >
      <use :xlink:href="`src/svg/icons.svg#icon-${name}`"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    size: {
      type: Number,
      default: 10,
    },
    name: {
      type: String,
      default: 'star',
    },
    color: {
      type: String,
      default: 'currentColor',
    },
  },
};
</script>

<style lang="scss">
  [class^="icon-"], [class*=" icon-"] {
    display: flex;
    user-select: none;
  }
</style>
