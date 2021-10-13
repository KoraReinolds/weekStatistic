import { createStore } from 'vuex';

const days = [...Array(7).keys()].map((i) => {
  const today = +new Date() + (i - 3) * 24 * 3600 * 1000;
  return new Date(today);
});

const dateToString = (d) => d.toISOString().split('T')[0].split('-').slice(1, 3).join('/');

export default createStore({
  state: {
    currentDay: dateToString(new Date()),
    labels: days.map(dateToString),
    products: {
      kasha: {
        id: 'kasha',
        name: 'каша',
        bju: [70, 20, 10],
      },
      ris: {
        id: 'ris',
        name: 'рис',
        bju: [50, 10, 20],
      },
    },
    dayActivity: {
      '10/10': {
        food: [{
          id: 'kasha',
        }, {
          id: 'ris',
        }],
      },
    },
  },
  getters: {
    timeLineData: (state) => state.labels.map((data) => {
      const dayData = state.dayActivity[data] || {};
      const food = dayData?.food?.map((f) => state.products[f.id]);
      return {
        data,
        food,
      };
    }),
  },
  mutations: {
    CHANGE_CURRENT_DAY: (state, day) => { state.currentDay = day; },
    ADD_FOOD: (state, { day, id }) => {
      const d = state.dayActivity[day];
      const food = { id };
      if (!d) state.dayActivity[day] = { food: [] };
      state.dayActivity[day].food.push(food);
      console.log(state.dayActivity);
    },
  },
  actions: {
  },
  modules: {
  },
});
