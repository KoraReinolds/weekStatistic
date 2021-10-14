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
        bju: [12, 6, 51],
      },
      ris: {
        id: 'ris',
        name: 'рис',
        bju: [12, 6, 51],
      },
    },
    dayActivity: {
      '10/10': {
        food: [{
          id: 'kasha',
          ratio: 1,
        }, {
          id: 'ris',
          ratio: 1,
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
    chartData: (state) => {
      const { proteins, fats, carbohydrates } = state.labels.reduce((sum, cur) => {
        const nutrs = sum || { proteins: [], fats: [], carbohydrates: [] };
        const food = state.dayActivity[cur]?.food || [];
        const nutrsDay = food.reduce(
          (nutrsSum, { id }) => nutrsSum.map(
            (value, i) => value + state.products[id].bju[i],
          ),
          [0, 0, 0],
        );
        nutrs.proteins.push(nutrsDay[0]);
        nutrs.fats.push(nutrsDay[1]);
        nutrs.carbohydrates.push(nutrsDay[2]);
        return nutrs;
      }, null);
      return {
        labels: state.labels,
        datasets: [
          {
            label: 'белки',
            borderColor: '#BBBDB9',
            backgroundColor: 'transparent',
            data: proteins,
          },
          {
            label: 'жиры',
            borderColor: '#FADA05',
            backgroundColor: 'transparent',
            data: fats,
          },
          {
            label: 'углеводы',
            borderColor: '#7A5A62',
            backgroundColor: 'transparent',
            data: carbohydrates,
          },
        ],
      };
    },
  },
  mutations: {
    CHANGE_CURRENT_DAY: (state, day) => { state.currentDay = day; },
    ADD_FOOD: (state, { day, id }) => {
      const d = state.dayActivity[day];
      const food = { id };
      if (!d) state.dayActivity[day] = { food: [] };
      state.dayActivity[day].food.push(food);
    },
  },
  actions: {
  },
  modules: {
  },
});
