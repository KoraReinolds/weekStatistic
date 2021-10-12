<template>
  <span
    class="product"
    @click="$emit('add', product.id)"
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

export default defineComponent({
  name: 'Product',
  props: {
    product: {
      type: Object,
    },
  },
  setup() {
    return {
    };
  },
});
</script>
<style lang="stylus">
.product
  cursor: pointer
</style>
