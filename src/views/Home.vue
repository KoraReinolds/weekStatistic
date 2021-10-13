<template>
  <line-chart
    :chartData="chartData"
    :chartOptions="{
      responsive: false,
    }"
  />
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
    const {
      products, labels,
    } = store.state;

    const currentDay = computed(() => store.state.currentDay);

    const timeLineData = computed(() => store.getters.timeLineData);

    return {
      currentDay,
      changeCurrentDay: (day) => store.commit('CHANGE_CURRENT_DAY', day),
      addToCurrentDay: (id) => store.commit('ADD_FOOD', { day: currentDay.value, id }),
      products,
      timeLineData,
      chartData: {
        labels,
        datasets: [
          {
            label: 'белки',
            borderColor: '#BBBDB9',
            backgroundColor: 'transparent',
            data: [40, 20, 12, 39, 10, 40, 39],
          },
          {
            label: 'жиры',
            borderColor: '#FADA05',
            backgroundColor: 'transparent',
            data: [50, 30, 52, 19, 20, 40, 39],
          },
          {
            label: 'углеводы',
            borderColor: '#7A5A62',
            backgroundColor: 'transparent',
            data: [20, 30, 52, 59, 40, 10, 39],
          },
        ],
      },
    };
  },
});
</script>
<style lang="stylus">
.product
  margin-right: 20px
</style>
