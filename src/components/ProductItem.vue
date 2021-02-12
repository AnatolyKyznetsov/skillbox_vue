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
import axios from 'axios';
import ColorsList from '@/components/ColorsList.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  components: {
    ColorsList,
  },
  data() {
    return {
      colorsData: null,
    };
  },
  props: {
    product: Object,
  },
  filters: {
    numberFormat,
  },
  methods: {
    loadColors() {
      axios.get('https://vue-study.skillbox.cc/api/colors')
        .then((response) => { this.colorsData = response.data; });
    },
  },
  computed: {
    colors() {
      const productColors = [];

      if (!this.colorsData) {
        return [];
      }

      this.colorsData.items.forEach((color) => {
        this.product.colors.forEach((item) => {
          if (item.id === color.id) {
            productColors.push(color);
          }
        });
      });

      return productColors;
    },
    firstColor() {
      return this.colors[0] ? this.colors[0].id : 0;
    },
  },
  created() {
    this.loadColors();
  },
};
</script>
