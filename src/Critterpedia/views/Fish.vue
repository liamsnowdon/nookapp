<template>
  <div>
    <critters :critter-type="critterType" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { CRITTER_TYPES, VUEX_MUTATIONS, VUEX_ACTIONS, MODULE } from '../constants';
import Critters from '@/Critterpedia/components/Critters.vue';

const { mapState, mapMutations, mapActions } = createNamespacedHelpers(MODULE);

export default {
  name: 'Fish',

  components: {
    Critters,
  },

  beforeRouteLeave (to, from, next) {
    this.clearFilters();
    next();
  },

  mounted () {
    this.getFish();
  },

  computed: {
    ...mapState({
      fish: state => state.fish,
    }),

    critterType () {
      return CRITTER_TYPES.FISH;
    },
  },

  methods: {
    ...mapMutations([
      VUEX_MUTATIONS.CLEAR_FILTERS,
    ]),

    ...mapActions([
      VUEX_ACTIONS.CATCH_FISH,
    ]),

    getFish () {
      if (Object.keys(this.fish).length) {
        return;
      }

      this.catchFish();
    },
  },
};
</script>
