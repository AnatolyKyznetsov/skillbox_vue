<template>
  <div class="form__counter" :class="classes">
    <button type="button" aria-label="Убрать один товар" @click="changeValue(value -1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="inputNumber" name="count">

    <button type="button" aria-label="Добавить один товар" @click="changeValue(value + 1)">
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
    classes: String,
  },
  methods: {
    changeValue(value) {
      if (value > 0) {
        this.$emit('input', value);
      }
    },
  },
  computed: {
    inputNumber: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
