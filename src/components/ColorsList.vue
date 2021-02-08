<template>
  <ul class="colors" :class="borderColor ? 'colors--' + borderColor  : false">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" :name="elementName" :value="color.id" v-model="currentColorComponent" >
        <span class="colors__value" :style="'background-color:' + color.value">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    colors: Array,
    currentColor: Number,
    borderColor: String,
    elementName: String,
  },
  computed: {
    currentColorComponent: {
      get() {
        return this.currentColor;
      },
      set(value) {
        this.$emit('update:currentColor', value);
      },
    },
  },
};
</script>
