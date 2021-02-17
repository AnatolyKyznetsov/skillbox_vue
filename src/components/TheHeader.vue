<template>
  <header class="header">
    <div class="header__wrapper container">
      <span class="header__info">Каталог</span>

      <router-link class="header__logo" :to="{name: 'main'}">
        <img src="img/svg/logo-tech.svg" alt="Логотип интернет магазина Технозавррр" width="190" height="33">
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>
      <!-- Прелоадер -->
      <AppPreloader v-if="productAddSending || loadingCart" class="loader--small" />
      <!-- Ссылк на корзину с кол-вом товара -->
      <CartIndicator v-else />
    </div>
  </header>
</template>

<script>
import CartIndicator from '@/components/cart/CartIndicator.vue';
import AppPreloader from '@/components/common/AppPreloader.vue';

export default {
  components: {
    CartIndicator,
    AppPreloader,
  },
  data() {
    return {
      productAddSending: false,
      loadingCart: false,
    };
  },
  watch: {
    '$store.state.productAddSending'() {
      this.productAddSending = this.$store.state.productAddSending;
    },
    '$store.state.loadingCart': {
      handler() {
        this.loadingCart = this.$store.state.loadingCart;
      },
      immediate: true,
    },
  },
};
</script>
