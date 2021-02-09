<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="goToPage('product', {id: product.id})">
      <img :src="product.img" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#" @click.prevent="goToPage('product', {id: product.id})">
        {{ product.title }}
      </a>
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
import goToPage from '@/helpers/goToPage';
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
  methods: {
    goToPage,
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
