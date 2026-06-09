<template>
  <template v-for="(Comp, idx) in components" :key="idx">
    <component :is="Comp" v-bind="$attrs" />
  </template>
</template>

<script>
import { getUI } from '@/plugins/ui-registry.js';

export default {
  name: 'SlotRenderer',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    components() {
      return getUI(this.name);
    }
  }
}
</script>
