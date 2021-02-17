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
    <ColorsList
      class="colors--black"
      :colors="colors"
      :elementName="'product_' + product.id"
      :current-color="firstColor"
    />
  </li>
</template>

<script>
import ColorsList from '@/components/colors/ColorsList.vue';
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
      return this.product.colors;
    },
    firstColor() {
      return this.colors[0].id;
    },
  },
};
</script>
