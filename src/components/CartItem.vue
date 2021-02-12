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

    <ProductCounter v-model.number="amount" class="product__counter" />

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
import ProductCounter from '@/components/ProductCounter.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapMutations } from 'vuex';

export default {
  props: {
    item: Object,
  },
  components: {
    ProductCounter,
  },
  filters: {
    numberFormat,
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(v) {
        let value = v;
        if (value <= 0 && !Number.isInteger(value)) {
          value = 0;
        }
        this.$store.commit('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
  },
};
</script>
