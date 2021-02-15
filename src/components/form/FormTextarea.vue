<template>
  <FormField :title="title" :error="error">
    <textarea class="form__input form__input--area" :placeholder="placeholder" v-model="dataValue"></textarea>
  </FormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>
