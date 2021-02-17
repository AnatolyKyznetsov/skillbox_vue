<template>
  <div class="loading-falled">
    <img :src="`${publicPath}/img/loading_falled.jpg`" alt="Произошла ошибка при загрузке товара" class="loading-falled__img">
    <h3 class="loading-falled__title"> Произошла ошибка при загрузке товара </h3>
    <button class="button button--primery loading-falled__button " @click="action" v-if="action">
      {{ btnTitle }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    action: Function,
    btnTitle: String,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

<style lang="stylus">
.loading-falled
  display flex
  flex-direction column
  align-items center
  justify-content center
  height 100%

  &__img
    max-width 300px

  &__title
    margin-bottom 20px

  &__button
    &:not(:disabled):hover
      background-color #9eff00

</style>
