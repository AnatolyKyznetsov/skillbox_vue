import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { setCookies } from '@/helpers/cookies';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    productAddSending: false,
    loadingCart: true,
    loadOrderInfo: true,
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((elem) => elem.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
    productAddSendingStatus(state, value) {
      state.productAddSending = value;
    },
    loadCartStatus(state, value) {
      state.loadingCart = value;
    },
    loadOrderInfoStatus(state, value) {
      state.loadOrderInfo = value;
    },
  },
  getters: {
    cartDetailsProducts(state) {
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData.find((p) => p.product.id === item.productId).product;

        return {
          ...item,
          product: {
            ...product,
            img: product.image.file.url,
          },
        };
      });
    },
    orderInfoBasket(state) {
      return state.orderInfo ? state.orderInfo.basket.items.map((item) => ({
        ...item,
        productId: item.product.id,
        amount: item.quantity,
      })) : [];
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailsProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return (new Promise((resolve) => setTimeout(resolve, 1000)))
        .then(() => {
          axios.get(API_BASE_URL + '/api/orders/' + orderId, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
            .then((response) => {
              context.commit('updateOrderInfo', response.data);
              context.commit('loadOrderInfoStatus', false);
            })
            .catch(() => router.replace({ name: 'notFound' }));
        });
    },
    loadCart(context) {
      return (new Promise((resolve) => setTimeout(resolve, 1000)))
        .then(() => {
          return axios.get(API_BASE_URL + '/api/baskets', {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
            .then((response) => {
              if (!context.state.userAccessKey) {
                setCookies('userAccessKey', response.data.user.accessKey);
                context.commit('updateUserAccessKey', response.data.user.accessKey);
              }

              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
              context.commit('loadCartStatus', false);
            });
        });
    },
    addProductToCart(context, { productId, amount }) {
      return (new Promise((resolve) => setTimeout(resolve, 1000)))
        .then(() => {
          return axios.post(API_BASE_URL + '/api/baskets/products', {
            productId: productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
            .then((response) => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            });
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      if (amount < 1) {
        return false;
      }

      return axios.put(API_BASE_URL + '/api/baskets/products', {
        productId: productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => context.commit('updateCartProductsData', response.data.items))
        .catch(() => context.commit('syncCartProducts'));
    },
    deleteCartProduct(context, productId) {
      context.commit('updateCartProductAmount', productId);

      return axios.delete(API_BASE_URL + '/api/baskets/products', {
        data: {
          productId: productId,
        },
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
  },
});
