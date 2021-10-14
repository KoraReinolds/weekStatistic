<template>
  <div
    class="chart"
  >
    <line-chart
      :chartData="chartData"
      :chartOptions="{
        responsive: true,
      }"
    />
  </div>
  <span
    class="product"
    v-for="(product, id) in products"
    :key="id"
  >
    <product
      @add="addToCurrentDay"
      :product="product"
    />
  </span>
  <time-line
    :currentDay="currentDay"
    :timeLineData="timeLineData"
    @changeCurDay="changeCurrentDay"
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
    const currentDay = computed(() => store.state.currentDay);
    const timeLineData = computed(() => store.getters.timeLineData);
    const chartData = computed(() => store.getters.chartData);

    return {
      currentDay,
      changeCurrentDay: (day) => store.commit('CHANGE_CURRENT_DAY', day),
      addToCurrentDay: (id) => store.commit('ADD_FOOD', { day: currentDay.value, id }),
      products,
      timeLineData,
      chartData,
    };
  },
});
</script>
<style lang="stylus">
.chart
  max-width: 500px
.product
  margin-right: 20px
</style>
