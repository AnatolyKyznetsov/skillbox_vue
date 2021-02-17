<template>
  <!-- Прелоадер -->
  <AppPreloader v-if="loadingCart" class="full-screen-height" />
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ $store.state.cartProducts.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" @submit.prevent>
        <div class="cart__field">
          <ul class="cart__list">
            <!-- Товар в корзине -->
            <CartItem :item="item" v-for="item in products" :key="item.productId" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totlalPrice | numberFormat }} ₽</span>
          </p>

          <router-link tag="button" class="cart__button button button--primery" type="submit" :to="{ name: 'order' }" v-if="products.length">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/cart/CartItem.vue';
import numberFormat from '@/helpers/numberFormat';
import AppPreloader from '@/components/common/AppPreloader.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loadingCart: false,
    };
  },
  components: {
    CartItem,
    AppPreloader,
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({ products: 'cartDetailsProducts', totlalPrice: 'cartTotalPrice' }),

    loadingCartComputed() {
      return this.$store.state.loadingCart;
    },
  },
  watch: {
    '$store.state.loadingCart': {
      handler() {
        this.loadingCart = this.$store.state.loadingCart;
      },
      immediate: true,
    },
  },
};
</script>
