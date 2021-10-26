<template>
  <span
    class="product"
    @click="addToCurrentDay(product)"
  >
    <span
      class="name"
    >
      {{ product.name }}
    </span>
    <span
      class="nutr"
    >
      ({{ product.bju[0] }}/{{ product.bju[1] }}/{{ product.bju[2] }})
    </span>
  </span>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Product',
  props: {
    product: {
      type: Object,
    },
  },
  setup() {
    const store = useStore();

    return {
      addToCurrentDay: (p) => store.commit('ADD_FOOD', p),
    };
  },
});
</script>
<style lang="stylus">
.product
  cursor: pointer
</style>
