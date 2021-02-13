<template>
  <div>
    <TheHeader />
    <router-view />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import { mapActions, mapMutations } from 'vuex';
import { getCookies } from '@/helpers/cookies';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
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
