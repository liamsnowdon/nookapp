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

  mounted () {
    this.getFish();
  },

  methods: {
    getFish () {
      if (Object.keys(this.$store.state.fish).length) {
        return;
      }

      this.$store.dispatch('catchFish');
    },
  },
};
</script>
