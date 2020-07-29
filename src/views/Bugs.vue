<template>
  <div>
    <critters :critter-type="critterType" />
  </div>
</template>

<script>
import { CRITTER_TYPES, VUEX_MUTATIONS, VUEX_ACTIONS } from '../constants';
import Critters from '@/components/Critters.vue';

export default {
  name: 'Bugs',

  components: {
    Critters,
  },

  beforeRouteLeave (to, from, next) {
    this.$store.commit(VUEX_MUTATIONS.CLEAR_FILTERS);
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
      if (this.$store.state.bugs.length) {
        return;
      }

      this.$store.dispatch(VUEX_ACTIONS.CATCH_BUGS);
    },
  },
};
</script>
