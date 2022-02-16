<template>
  <div class="rating">
    <icon
        v-for="i in rating"
        :key="i"
        name="star-full"
        :size="13"
        class="rating-star"
    />
  </div>
</template>

<script>
import Icon from './Icon';

export default {
  name: 'RatingStars',
  components: {
    Icon
  },
  props: {
    rating: {
      type: Number,
      required: true,
      default: 0,
    }
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/_colors.scss";
.rating {
  display: inline-flex;
  align-items: center;

  &-star {
    color: $color-primary;
  }
}
</style>
