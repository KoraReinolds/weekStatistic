<template>
  {{ timeLineData }}
  <div
    class="timeline"
  >
    <span
      :class="[
        'section',
        { current: currentDay === section.data }
      ]"
      v-for="(section, dateIndex) in timeLineData"
      :key="`section-${dateIndex}`"
    >
      <span
        class="date"
        @click="changeCurrentDay(section.data)"
        v-text="section.data"
      />
      <span
        class="food"
        v-for="(food, foodIndex) in section.food"
        :key="`food-${foodIndex}`"
      >
        <span
          class="name"
          v-text="`${food.name} - ${food.weight}g`"
        />
        <div class="actions">
          <span
            :class="['delete', {
              hide: foodListByIndex(dateIndex + 1).includes(food.id)
            }]"
            @click="deleteFood({
              section, id: food.id
            })"
            v-text="'X'"
          />
          <span
            :class="['next', {
              hide: foodListByIndex(dateIndex + 1).includes(food.id)
            }]"
            @click="addFoodToOtherDay({
              section, food
            })"
            v-text="'>'"
          />
        </div>
      </span>
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

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
  setup(props) {
    const store = useStore();

    const foodListByIndex = (i) => {
      const list = props.timeLineData[i]?.food || [];
      return Object.keys(list);
    };

    return {
      foodListByIndex,
      addFoodToOtherDay: (params) => store.commit('ADD_FOOD_TO_OTHER_DAY', params),
      changeCurrentDay: (day) => store.commit('CHANGE_CURRENT_DAY', day),
      deleteFood: (params) => store.commit('DELETE_FOOD', params),
    };
  },
});
</script>
<style scoped lang="stylus">

.food
  display: flex
  position: relative
  width: 100%

  .actions
    display: block
    left: 0
    width: 100%
    position: absolute
    display: flex

    .delete
      background: red

.next, .delete
  width: 50%
  opacity: 0
  cursor: pointer
  &:hover
    opacity: 0.5
  &.hide
    visibility: hidden

.next
  background: green
  height: 100%
  text-align: center

.timeline
  margin: 30px;
  height: 500px
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: flex-start

  .section
    height: 100%
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
