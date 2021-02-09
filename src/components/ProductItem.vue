<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.img" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: product.id}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat}} ₽
    </span>

    <!-- Выбор цветов -->
    <ColorsList :colors="colors" borderColor="black" :elementName="'product_' + product.id" :current-color="firstColor" />
  </li>
</template>

<script>
import colors from '@/data/colors';
import ColorsList from '@/components/ColorsList.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  components: {
    ColorsList,
  },
  props: {
    product: Object,
  },
  filters: {
    numberFormat,
  },
  computed: {
    colors() {
      const productColors = [];

      colors.forEach((color) => {
        if (this.product.colorsId.some((id) => id === color.id)) {
          productColors.push(color);
        }
      });

      return productColors;
    },
    firstColor() {
      return this.colors[0].id;
    },
  },
};
</script>
