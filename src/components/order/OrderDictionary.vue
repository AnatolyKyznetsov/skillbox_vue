<template>
  <AppPreloader v-if="loadOrderInfo" />
  <ul class="dictionary" v-else>
    <li class="dictionary__item" v-for="item in dictionary" :key="item.id">
      <span class="dictionary__key">
        {{ item.key }}
      </span>
      <span class="dictionary__value">
        {{ item.value }}
      </span>
    </li>
  </ul>
</template>

<script>
import AppPreloader from '@/components/common/AppPreloader.vue';

export default {
  components: {
    AppPreloader,
  },
  props: {
    name: String,
    address: String,
    phone: String,
    email: String,
    payment: String,
    status: String,
    loadOrderInfo: Boolean,
  },
  computed: {
    dictionary() {
      return [
        { key: 'Получатель', value: this.name, id: 1 },
        { key: 'Адрес доставки', value: this.address, id: 2 },
        { key: 'Телефон', value: this.phone, id: 3 },
        { key: 'Email', value: this.email, id: 4 },
        { key: 'Способ оплаты', value: this.payment, id: 5 },
        { key: 'Статус заказа', value: this.status, id: 6 },
      ];
    },
  },
};
</script>
