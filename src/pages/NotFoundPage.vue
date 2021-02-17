<template>
  <div class="notFoundPage full-screen-height">
    <img width="300" height="auto" :src="`${publicPath}/img/loading_falled.jpg`" alt=">Страница не найдена">
    <h1>Страница не найдена</h1>
    <div>
      <router-link class="button button--primery notFoundPage__button" :to="{name: 'main'}">
        На главную
      </router-link >
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="stylus">
.notFoundPage
  display flex
  align-items center
  justify-content center
  flex-direction column

  &__button
    &:not(:disabled):hover
      background-color #9eff00

</style>
