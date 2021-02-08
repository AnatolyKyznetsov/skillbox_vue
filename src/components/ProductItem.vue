<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.img" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
    </span>

    <!-- Выбор цветов -->
    <ColorsList :colors="colors" borderColor="black" :elementName="'product_' + product.id" :current-color="firstColor" />
  </li>
</template>

<script>
import colors from '../data/colors';
import ColorsList from './ColorsList.vue';

export default {
  components: {
    ColorsList,
  },
  props: {
    product: Object,
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
