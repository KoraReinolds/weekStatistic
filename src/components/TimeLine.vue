<template>
  <div
    class="timeline"
  >
    <span
      :class="[
        'section',
        { current: currentDay === section.data }
      ]"
      v-for="(section, index) in timeLineData"
      :key="`section-${index}`"
    >
      <span
        class="date"
        @click="$emit('changeCurDay', section.data)"
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
    currentDay: {
      type: String,
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

    &.current
      background-color: lightgreen
</style>
