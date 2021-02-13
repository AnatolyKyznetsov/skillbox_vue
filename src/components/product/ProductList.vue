<template>
  <ul class="catalog__list">
    <ProductItem :product="product" v-for="product in products" :key="product.id" />
  </ul>
</template>

<script>
import ProductItem from '@/components/product/ProductItem.vue';

export default {
  components: {
    ProductItem,
  },
  props: {
    products: Array,
  },
};
</script>
