<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="inputNumber--">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="inputNumber" name="count">

    <button type="button" aria-label="Добавить один товар" @click="inputNumber++">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
  },
  computed: {
    inputNumber: {
      get() {
        return this.value;
      },
      set(value) {
        if (value > 0) {
          this.$emit('input', value);
        }
      },
    },
  },
};
</script>
