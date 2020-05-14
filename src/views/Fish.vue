<template>
  <div>
    <critters :critter-type="'fish'" />
  </div>
</template>

<script>
import Critters from '@/components/Critters.vue';

export default {
  name: 'Fish',

  components: {
    Critters,
  },
};
</script>
