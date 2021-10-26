<template>
  <div class="header">
    <div class="chart">
      <line-chart
        :chartData="chartData"
        :chartOptions="{
          responsive: true,
        }"
      />
    </div>
    <div class="products">
      <span
        class="product"
        v-for="(product, id) in products"
        :key="id"
      >
        <product
          :product="product"
        />
      </span>
    </div>
  </div>
  <time-line
    :currentDay="currentDay"
    :timeLineData="timeLineData"
  />

</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import LineChart from '@/components/LineChart';
import Product from '@/components/Product.vue';
import TimeLine from '@/components/TimeLine.vue';

export default defineComponent({
  name: 'App',
  components: {
    LineChart,
    Product,
    TimeLine,
  },
  setup() {
    const store = useStore();
    const { products } = store.state;
    const currentDay = computed(() => store.getters.currentDay);
    const timeLineData = computed(() => store.getters.timeLineData);
    const chartData = computed(() => store.getters.chartData);

    return {
      currentDay,
      products,
      timeLineData,
      chartData,
    };
  },
});
</script>
<style lang="stylus">
.header
  display: flex
.chart
  max-width: 500px
.product
  text-align: left
.products
  margin-left: 20px
  display: flex
  flex-direction: column
</style>
