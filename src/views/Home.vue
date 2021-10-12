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
    @changeCurDay="changeCurDay"
  />

</template>

<script>
import { defineComponent, ref } from 'vue';
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
    const dateToString = (d) => d.toISOString().split('T')[0].split('-').slice(1, 3).join('/');
    const currentDay = ref(dateToString(new Date()));
    const products = {
      kashsa: {
        id: 'kashsa',
        name: 'каша',
        bju: [70, 20, 10],
      },
      ris: {
        id: 'ris',
        name: 'рис',
        bju: [50, 10, 20],
      },
    };
    const days = [...Array(7).keys()].map((i) => {
      const today = +new Date() + (i - 3) * 24 * 3600 * 1000;
      return new Date(today);
    });
    const labels = days.map(dateToString);
    const timeLineData = labels.map((data) => ({
      data,
      food: [],
    }));
    return {
      currentDay,
      changeCurrentDay: (day) => { currentDay.value = day; },
      addToCurrentDay: (id) => console.log(id),
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
