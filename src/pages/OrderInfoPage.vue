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
          <OrderDictionary :name="orderInfo.name" :address="orderInfo.address" :phone="orderInfo.phone" :email="orderInfo.email" payment="Картой при получении" :status="status" :loadOrderInfo="loadOrderInfo" />
        </div>
        <OrderList :products="products" :amount="products.length" :totalPrice="orderInfo.totalPrice" :loading="loadOrderInfo" />
      </form>
    </section>
  </main>
</template>

<script>
import OrderDictionary from '@/components/order/OrderDictionary.vue';
import OrderList from '@/components/order/OrderList.vue';
import numberFormat from '@/helpers/numberFormat';

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
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      return;
    }

    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
  computed: {
    orderInfo() {
      return this.$store.state.orderInfo ? this.$store.state.orderInfo : {};
    },
    products() {
      return this.orderInfo.basket ? this.orderInfo.basket.items.map((item) => ({
        ...item,
        productId: item.product.id,
        amount: item.quantity,
      })) : [];
    },
    status() {
      return this.orderInfo.status ? this.orderInfo.status.title : '';
    },
  },
  watch: {
    '$store.state.loadOrderInfo': {
      handler() {
        this.loadOrderInfo = this.$store.state.loadOrderInfo;
      },
      immediate: true,
    },
  },
};
</script>
