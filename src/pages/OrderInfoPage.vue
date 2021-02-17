<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span v-show="!loadOrderInfo">№ {{ orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>
          <!-- Информация о заказе -->
          <OrderDictionary :dictionary="dictionary" :loadOrderInfo="loadOrderInfo" />
        </div>
        <!-- Список товаров -->
        <OrderList
          :products="products"
          :amount="products.length"
          :totalPrice="orderInfo.totalPrice"
          :loading="loadOrderInfo"
        />
      </form>
    </section>
  </main>
</template>

<script>
import OrderDictionary from '@/components/order/OrderDictionary.vue';
import OrderList from '@/components/order/OrderList.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loadOrderInfo: true,
    };
  },
  components: {
    OrderDictionary,
    OrderList,
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({ products: 'orderInfoBasket' }),

    orderInfo() {
      return this.$store.state.orderInfo || {};
    },
    loadOrderInfoComputed() {
      return this.$store.state.loadOrderInfo;
    },
    status() {
      return this.orderInfo.status ? this.orderInfo.status.title : '';
    },
    dictionary() {
      return [
        { key: 'Получатель', value: this.orderInfo.name, id: 1 },
        { key: 'Адрес доставки', value: this.orderInfo.address, id: 2 },
        { key: 'Телефон', value: this.orderInfo.phone, id: 3 },
        { key: 'Email', value: this.orderInfo.email, id: 4 },
        { key: 'Способ оплаты', value: 'Картой при получении', id: 5 },
        { key: 'Статус заказа', value: this.status, id: 6 },
      ];
    },
  },
  watch: {
    '$store.state.loadOrderInfo': {
      handler() {
        this.loadOrderInfo = this.loadOrderInfoComputed;
      },
      immediate: true,
    },
    '$route.params.id': {
      handler() {
        this.$store.commit('loadOrderInfoStatus', true);

        if (this.loadOrderInfoComputed && this.loadOrderInfoComputed.id === this.$route.params.id) {
          this.$store.commit('loadOrderInfoStatus', false);
          return;
        }

        this.$store.dispatch('loadOrderInfo', this.$route.params.id);
      },
      immediate: true,
    },
  },
};
</script>
