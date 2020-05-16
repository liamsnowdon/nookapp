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

  beforeRouteLeave (to, from, next) {
    this.$store.commit('clearFilters');
    next();
  },

  mounted () {
    this.getBugs();
  },

  methods: {
    getBugs () {
      if (Object.keys(this.$store.state.bugs).length) {
        return;
      }

      this.$store.dispatch('catchBugs');
    },
  },
};
</script>
