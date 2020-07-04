<template>
  <div>
    <critters :critter-type="critterType" />
  </div>
</template>

<script>
import { CRITTER_TYPES, VUEX_MUTATIONS, VUEX_ACTIONS } from '../constants';
import Critters from '@/components/Critters.vue';

export default {
  name: 'SeaCreatures',

  components: {
    Critters,
  },

  beforeRouteLeave (to, from, next) {
    this.$store.commit(VUEX_MUTATIONS.CLEAR_FILTERS);
    next();
  },

  mounted () {
    this.getSeaCreatures();
  },

  computed: {
    critterType () {
      return CRITTER_TYPES.SEA_CREATURES;
    },
  },

  methods: {
    getSeaCreatures () {
      if (Object.keys(this.$store.state.seaCreatures).length) {
        return;
      }

      this.$store.dispatch(VUEX_ACTIONS.CATCH_SEA_CREATURES);
    },
  },
};
</script>
