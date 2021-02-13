<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <!-- Фильтры -->
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId" :product-color.sync="filterColorId" />
      <section class="catalog">
        <!-- Ошибка загрузки товара -->
        <ProductsLoadingFalled v-if="productsLoadingFaled" :action="loadProducts" btn-title="Попробовать снова" />
        <!-- Нет товара с указанными параметрами -->
        <div v-if="noSuchProducts">
          Нет товаров с такими параметрами. <br> Попробуйте применить другой фильтр.
        </div>
        <!-- Прелоадер -->
        <AppPreloader v-if="productsLoading" />
        <!-- Список товаров -->
        <ProductList v-else :products="products" />
        <!-- Пагинация -->
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import AppPreloader from '@/components/AppPreloader.vue';
import ProductsLoadingFalled from '@/components/ProductsLoadingFalled.vue';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    AppPreloader,
    ProductsLoadingFalled,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      productsPerPage: 3,

      productsData: null,
      productsLoading: false,
      productsLoadingFaled: false,
    };
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFaled = false;

      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE_URL + '/api/products', {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColorId,
          },
        })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFaled = true; })
          .then(() => { this.productsLoading = false; });
      }, 500);
    },
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          img: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    noSuchProducts() {
      const noSuchProducts = this.productsData && !this.productsData.items.length;
      const noOtherElements = !this.productsLoading && !this.productsLoadingFaled;

      return noSuchProducts && noOtherElements;
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
