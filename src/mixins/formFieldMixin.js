import FormField from '@/components/form/FormField.vue';

export default {
  props: {
    title: String,
    error: String,
    placeholder: String,
    value: String,
  },
  components: {
    FormField,
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
