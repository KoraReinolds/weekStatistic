import { createStore } from 'vuex';

const dateToString = (d) => d.toISOString().split('T')[0].split('-').slice(1, 3).join('/');

export default createStore({
  state: {
    currentDay: new Date(),
    products: {
      kasha: {
        id: 'kasha',
        name: 'каша',
        bju: [13, 7, 60],
        defaultRatio: 0.5,
      },
      ris: {
        id: 'ris',
        name: 'рис',
        bju: [7.2, 1, 74],
        defaultRatio: 0.8,
      },
      nemoloko: {
        id: 'nemoloko',
        name: 'немолоко (3.2)',
        bju: [1, 3.2, 6.5],
        defaultRatio: 1.0,
      },
      mindal: {
        id: 'mindal',
        name: 'миндаль',
        bju: [18.6, 53.7, 13],
        defaultRatio: 0.5,
      },
      peanut: {
        id: 'peanut',
        name: 'арахис',
        bju: [26, 52, 13.4],
        defaultRatio: 0.5,
      },
      chicken: {
        id: 'chicken',
        name: 'курица',
        bju: [18.1, 1.8, 0.4],
        defaultRatio: 1.0,
      },
      milk: {
        id: 'milk',
        name: 'молоко',
        bju: [2.9, 2.5, 4.8],
        defaultRatio: 0.1,
      },
      yelli_1: {
        id: 'yelli_1',
        name: 'суп с Булгуром Yelli',
        bju: [19, 1.5, 54],
        defaultRatio: 0.5,
      },
      yelli_2: {
        id: 'yelli_2',
        name: 'суп рис + кокос Yelli',
        bju: [8.8, 1.1, 73],
        defaultRatio: 0.75,
      },
      egg: {
        id: 'egg',
        name: 'яйцо',
        bju: [12.7, 11.5, 0.7],
        defaultRatio: 0.62,
      },
      sandwich: {
        id: 'sandwich',
        name: 'бутер с сыром и колбасой',
        bju: [8.6, 10, 15.6],
        defaultRatio: 1,
      },
    },
    dayActivity: JSON.parse(localStorage.getItem('dayActivity')) || {},
  },
  getters: {
    currentDay: (state) => dateToString(state.currentDay),
    labels: (state) => {
      const days = [...Array(7).keys()].map((i) => {
        const today = +state.currentDay + (i - 3) * 24 * 3600 * 1000;
        return new Date(today);
      });
      return days.map(dateToString);
    },
    timeLineData: (state, getters) => getters.labels.map((data) => {
      const dayData = state.dayActivity[data] || {};
      const food = dayData?.food?.map((f) => state.products[f.id]);
      return {
        data,
        food,
      };
    }),
    chartData: (state, getters) => {
      const { proteins, fats, carbohydrates } = getters.labels.reduce((sum, cur) => {
        const nutrs = sum || { proteins: [], fats: [], carbohydrates: [] };
        const food = state.dayActivity[cur]?.food || [];
        const nutrsDay = food.reduce(
          (nutrsSum, { id, ratio }) => nutrsSum.map(
            (value, i) => value + state.products[id].bju[i] * ratio,
          ),
          [0, 0, 0],
        );
        nutrs.proteins.push(nutrsDay[0]);
        nutrs.fats.push(nutrsDay[1]);
        nutrs.carbohydrates.push(nutrsDay[2]);
        return nutrs;
      }, null);
      return {
        labels: getters.labels,
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
    CHANGE_CURRENT_DAY: (state, day) => {
      const [m, d] = day.split('/');
      const date = new Date();
      date.setMonth(m - 1);
      date.setDate(+d + 1);
      state.currentDay = date;
    },
    ADD_FOOD: (state, { day, id }) => {
      const d = state.dayActivity[day];
      const product = state.products[id];
      const food = { id, ratio: product.defaultRatio };
      if (!d) state.dayActivity[day] = { food: [] };
      state.dayActivity[day].food.push(food);
      localStorage.setItem('dayActivity', JSON.stringify(state.dayActivity));
    },
  },
  actions: {
  },
  modules: {
  },
});
