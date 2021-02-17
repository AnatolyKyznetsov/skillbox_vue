<template>
  <li class="cart__item product">
    <router-link class="product__pic" :to="{name: 'product', params: {id: item.product.id}}">
      <img :src="item.product.img" width="120" height="120" :alt="item.product.title">
    </router-link>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>

    <span class="product__code">
      Артикул: {{ item.productId }}
    </span>
    <!-- Счетчик -->
    <AppCounter v-model.number="amount" class="product__counter" />

    <b class="product__price">
      {{ (item.product.price * item.amount) | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import AppCounter from '@/components/common/AppCounter.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';

export default {
  props: {
    item: Object,
  },
  components: {
    AppCounter,
  },
  filters: {
    numberFormat,
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapActions({ deleteProduct: 'deleteCartProduct' }),
  },
};
</script>
