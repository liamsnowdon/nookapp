<template>
  <div>
    <critters :critter-type="critterType" />
  </div>
</template>

<script>
import { CRITTER_TYPES } from '../constants';
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

  computed: {
    critterType () {
      return CRITTER_TYPES.BUGS;
    },
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
