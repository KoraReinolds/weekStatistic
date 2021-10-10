<template>
  <div
  >
    <span
      class="name"
    >
      {{ product.name }}
    </span>
    <span
      class="nutr b"
    >
      {{ product.bju[0] }}
    </span>
    <span
      class="nutr j"
    >
      {{ product.bju[1] }}
    </span>
    <span
      class="nutr u"
    >
      {{ product.bju[2] }}
    </span>
    <button>
      Add
    </button>
  </div>
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
  .nutr
    padding: 0 5px
</style>
