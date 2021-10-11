<template>
  <div
    class="timeline"
  >
    <span
      class="section"
      v-for="(section, index) in timeLineData"
      :key="`section-${index}`"
    >
      <span
        class="date"
      >
        {{ section.data }}
      </span>
      <span
        class="food"
        v-for="(food, index) in section.food"
        :key="`food-${index}`"
      >
        {{ food.name }}
      </span>
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Product',
  props: {
    timeLineData: {
      type: Array,
    },
  },
  setup() {
  },
});
</script>
<style lang="stylus">
.timeline
  margin: 30px;
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center

  .section
    display: flex
    flex-direction: column
    padding: 0 auto
    width: 100%

    &:not(:last-child)
      border-right: 1px solid black

    .date
      padding: 20px;
</style>
