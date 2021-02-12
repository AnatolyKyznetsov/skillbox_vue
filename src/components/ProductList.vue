<template>
  <ul class="catalog__list" v-if="products.length">
    <ProductItem :product="product" v-for="product in products" :key="product.id" />
  </ul>
  <div v-else>
      Нет товаров с такими параметрами. <br> Попробуйте применить другой фильтр.
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  components: {
    ProductItem,
  },
  props: {
    products: Array,
  },
};
</script>
