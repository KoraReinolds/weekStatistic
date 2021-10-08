<template>
  <LineChart
    :chartData="chartData"
    :chartOptions="{
      responsive: false,
    }"
  />
</template>

<script>
import { defineComponent } from 'vue';
import LineChart from '@/components/LineChart';

export default defineComponent({
  name: 'App',
  components: {
    LineChart,
  },
  setup() {
    return {
      chartData: {
        labels: ['ср', 'чт', 'пт', 'сб', 'вс', 'пн', 'вт'],
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
</style>
