<template>
  <div>
    <critters :critter-type="'bugs'" />
  </div>
</template>

<script>
import Critters from '@/components/Critters.vue';

export default {
  name: 'Bugs',

  components: {
    Critters,
  },
};
</script>
