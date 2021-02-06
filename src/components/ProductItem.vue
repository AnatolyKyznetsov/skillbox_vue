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

    <ul class="colors colors--black">
      <li class="colors__item" v-for="(color, index) in product.colors" :key="color">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color" :name="'product_' + product.id" :checked="index === 0 ? true : false">
          <span class="colors__value" :style="'background-color:' + color">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>
