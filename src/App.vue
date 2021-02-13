<template>
  <div>
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { mapActions, mapMutations } from 'vuex';
import { getCookies } from '@/helpers/cookies';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  created() {
    const userAccessKey = getCookies('userAccessKey');

    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }

    this.loadCart();
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
};
</script>
