<template>
  <div class="grid-toggle">
    <icon
      name="grid"
      :size="30"
      :class="{ active: isGrid }"
      title="Switch to grid layout"
      tabindex="0"
      role="button"
      aria-label="Switch to grid layout"
      @click="toggleGrid"
    />
    <icon
      name="list"
      :size="30"
      :class="{ active: !isGrid }"
      tabindex="0"
      role="button"
      title="Switch to a list layout"
      aria-label="Switch to a list layout"
      @click="toggleGrid"
    />
  </div>
</template>
<script>
import Icon from "./Icon";

export default {
  name: 'GridToggle',
  components: {
    Icon,
  },
  data() {
    return {
      isGrid: true
    };
  },
  methods: {
    toggleGrid() {
      this.isGrid = !this.isGrid;
      this.$emit('toggle', this.isGrid);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/scss/_colors.scss";

.grid-toggle {
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  padding: 0;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 20px;
  }

  @media (max-width: 567px) {
    display: none;
  }

  .icon {
    display: inline-block;
    cursor: pointer;
    color: $color-secondary;
    margin-right: 10px;

    &:hover,
    &.active {
      color: $color-primary;
    }

    &.active {
      opacity: 0.8;
      pointer-events: none;
      cursor: none;
    }
  }
}
</style>
