<template>
  <!-- Прелоадер -->
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
    dictionary: Array,
    loadOrderInfo: Boolean,
  },
};
</script>
