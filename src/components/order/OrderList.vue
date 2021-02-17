<template>
  <div class="cart__block">
    <!-- Прелоадер -->
    <AppPreloader v-if="loading" class="loader--small" style="margin-bottom: 40px"/>
    <ul class="cart__orders" v-else>
      <li class="cart__order" v-for="item in products" :key="item.productId">
        <h3>{{ item.product.title }}</h3>
        <b>{{ (item.product.price * item.amount) | numberFormat }} ₽</b>
        <span>Артикул: {{ item.productId }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ amount }}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
    </div>

    <button class="cart__button button button--primery" type="submit" v-if="showButton">
      Оформить заказ
    </button>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import AppPreloader from '@/components/common/AppPreloader.vue';

export default {
  props: {
    products: Array,
    totalPrice: Number,
    loading: Boolean,
    amount: Number,
    showButton: Boolean,
  },
  components: {
    AppPreloader,
  },
  filters: {
    numberFormat,
  },
};
</script>
