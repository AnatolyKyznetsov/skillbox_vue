<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a href="#" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled' : page === 1}" aria-label="Предыдущая страница" @click.prevent="prevPage(page)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link" :class="{'pagination__link--current' : pageNumber === page}" @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a href="#"  class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled' : page === pages}" aria-label="Следующая страница" @click.prevent="nextPage(page)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: {
    page: Number,
    count: Number,
    perPage: Number,
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    nextPage(page) {
      const nextPage = page + 1 > this.pages ? page : page + 1;
      this.$emit('paginate', nextPage);
    },
    prevPage(page) {
      const prevPage = page - 1 < 1 ? 1 : page - 1;
      this.$emit('paginate', prevPage);
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
};
</script>
