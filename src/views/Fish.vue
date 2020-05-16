<template>
  <div>
    <critters :critter-type="critterType" />
  </div>
</template>

<script>
import { CRITTER_TYPES, VUEX_MUTATIONS, VUEX_ACTIONS } from '../constants';
import Critters from '@/components/Critters.vue';

export default {
  name: 'Fish',

  components: {
    Critters,
  },

  beforeRouteLeave (to, from, next) {
    this.$store.commit(VUEX_MUTATIONS.CLEAR_FILTERS);
    next();
  },

  mounted () {
    this.getFish();
  },

  computed: {
    critterType () {
      return CRITTER_TYPES.FISH;
    },
  },

  methods: {
    getFish () {
      if (Object.keys(this.$store.state.fish).length) {
        return;
      }

      this.$store.dispatch(VUEX_ACTIONS.CATCH_FISH);
    },
  },
};
</script>
