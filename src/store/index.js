import { createStore } from 'vuex';

const dateToString = (d) => (new Date(+d + 1000 * 3 * 3600))
  .toISOString()
  .split('T')[0]
  .split('-')
  .slice(1, 3)
  .join('/');

const stringTodate = (day) => {
  const [m, d] = day.split('/');
  const date = new Date();
  date.setMonth(+m - 1);
  date.setDate(+d);
  return date;
};

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
      const food = dayData?.food?.reduce(
        (productMap, f) => {
          const product = { ...state.products[f.id] };
          product.weight = Math.floor((f.ratio * 100) / f.parts);
          return {
            ...productMap,
            [product.id]: product,
          };
        }, {},
      );
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
    DELETE_FOOD: (state, { section, id }) => {
      const { food } = state.dayActivity[section.data];
      const index = food.findIndex(({ id: foodId }) => foodId === id);
      const q = food.splice(index);
      const findFoodById = (list) => list.find((f) => f.id === id);
      const delta = 1000 * 3600 * 24;
      const newDate = new Date(+stringTodate(section.data) - delta);
      let { parts } = q[0];
      while (parts) {
        parts -= 1;
        const dayToChange = dateToString(new Date(+newDate - delta * parts));
        const currentFoodList = state.dayActivity[dayToChange].food;
        const foodToChange = findFoodById(currentFoodList);
        if (foodToChange) foodToChange.parts -= 1;
      }
      localStorage.setItem('dayActivity', JSON.stringify(state.dayActivity));
    },
    ADD_FOOD_TO_OTHER_DAY: (state, { section, food }) => {
      const curDayFoodList = state.dayActivity[section.data].food;
      const findFoodById = (list) => list.find((f) => f.id === food.id);
      const curFood = findFoodById(curDayFoodList);
      let parts = curFood.parts + 1;

      const delta = 1000 * 3600 * 24;
      const newDate = new Date(+stringTodate(section.data) + delta);
      const newDateStr = dateToString(newDate);
      const dayActivity = state.dayActivity[newDateStr]
      || (state.dayActivity[newDateStr] = { food: [] });
      dayActivity.food.push({ ...curFood });
      while (parts) {
        parts -= 1;
        const dayToChange = dateToString(new Date(+newDate - delta * parts));
        const currentFoodList = state.dayActivity[dayToChange].food;
        const foodToChange = findFoodById(currentFoodList);

        foodToChange.parts += 1;
      }
      localStorage.setItem('dayActivity', JSON.stringify(state.dayActivity));
    },
    CHANGE_CURRENT_DAY: (state, day) => {
      state.currentDay = stringTodate(day);
    },
    ADD_FOOD: (state, { id, defaultRatio }) => {
      // eslint-disable-next-line
      const ratio = prompt('', defaultRatio);
      const day = dateToString(state.currentDay);
      const d = state.dayActivity[day];
      const food = {
        id,
        ratio,
        parts: 1,
      };
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
