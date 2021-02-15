<template>
  <FormField :title="title" :error="error">
    <input class="form__input" :type="type" :placeholder="placeholder" v-model="dataValue">
  </FormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: {
    type: {
      default: 'text',
      type: String,
    },
  },
  mixins: [formFieldMixin],
};
</script>
