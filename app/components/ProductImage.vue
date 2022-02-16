<template>
  <picture class="product-wrapper">
    <source media="(max-width: 767px)" :srcset="generateImgSrc(src, 'mobile')">
    <source media="(min-width: 768px)" :srcset="generateImgSrc(src, 'desktop')">
    <img class="product-image" :src="src" :alt="title">
  </picture>
</template>
<script>
export default {
  name: 'ProductImage',
  components: {},
  props: {
    src: {
      type: String,
      required: true,
      default: '',
    },
    title: {
      type: String,
      required: true,
      default: '',
    }
  },
  methods: {
    generateImgSrc(src, res) {
      const baseSrc = 'http://placehold.it/';
      if (res === 'mobile') return `${baseSrc}340x230, ${baseSrc}680x460 2x`;
      else return `${baseSrc}370x250, ${baseSrc}740x500 2x`;
    },
  },
};
</script>
<style lang="scss" scoped>
  .product {
    &-wrapper {
      display: flex;
    }

    &-image {
      width: 100%;
    }
  }
  
</style>
