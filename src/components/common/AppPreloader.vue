<template>
  <div class="loader">
    <div class="loader__wrapper">
      <div class="loader__circle"></div>
      <div class="loader__circle"></div>
      <div class="loader__circle"></div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="stylus">
size_lg = 200px
size_sm = 30px
duration = 2s

@keyframes animate-circle
  from
    transform scale(0)
    opacity 1

  to
    transform scale(1)
    opacity 0

.loader
  display flex
  justify-content center
  align-items center
  height 100%

  &--small
    .loader__wrapper
      height size_sm
      width size_sm

  &__wrapper
    height size_lg
    width size_lg

  &__circle
    position absolute
    height inherit
    width inherit
    background #9eff00
    border-radius 50%
    animation animate-circle duration cubic-bezier(.9,.24,.62,.79) infinite

    &:nth-of-type(1)
      animation-delay 0

    &:nth-of-type(2)
      animation-delay (duration / -3)

    &:nth-of-type(3)
      animation-delay (duration / -6)

</style>
