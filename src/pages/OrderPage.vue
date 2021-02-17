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
        Корзина
      </h1>
      <span class="content__info">
        {{ $store.state.cartProducts.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <!-- Прелоадер -->
        <AppPreloader v-if="formSending" />
        <div class="cart__field" v-else>
          <div class="cart__data">
            <!-- Элементы формы -->
            <FormText title="ФИО" :error="formError.name" v-model="formData.name" placeholder="Введите ваше полное имя" />
            <FormText title="Адрес доставки" :error="formError.address" v-model="formData.address" placeholder="Введите ваш адрес" />
            <FormText title="Телефон" :error="formError.phone" v-model="formData.phone" placeholder="Введите ваш телефон" type="tel" />
            <FormText title="Email" :error="formError.email" v-model="formData.email" placeholder="Введите ваш Email" type="email" />
            <FormTextarea title="Комментарий к заказу" :error="formError.comment" placeholder="Ваши пожелания" v-model="formData.comment" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <!-- Список товаров -->
        <OrderList
          :products="products"
          :totalPrice="totalPrice"
          :amount="$store.state.cartProducts.length"
          :showButton="true" :loading="loadingCart"
        />
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { API_BASE_URL } from '@/config';
import numberFormat from '@/helpers/numberFormat';
import FormText from '@/components/form/FormText.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import AppPreloader from '@/components/common/AppPreloader.vue';
import OrderList from '@/components/order/OrderList.vue';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      loadingCart: false,
      formErrorMessage: '',
      formSending: false,
    };
  },
  components: {
    FormText,
    FormTextarea,
    AppPreloader,
    OrderList,
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({ products: 'cartDetailsProducts', totalPrice: 'cartTotalPrice' }),
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.formSending = true;

      setTimeout(() => {
        axios.post(API_BASE_URL + '/api/orders', {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
          .then((response) => {
            this.$store.commit('resetCart');
            this.$store.commit('updateOrderInfo', response.data);
            this.formData = {};
            this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
          })
          .catch((error) => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
          })
          .then(() => { this.formSending = false; });
      }, 1000);
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
