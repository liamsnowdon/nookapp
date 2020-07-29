<template>
  <div>
    <critters :critter-type="critterType" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { CRITTER_TYPES } from 'Critterpedia/constants/critter-types';
import { MODULE, MUTATIONS, ACTIONS } from 'Critterpedia/constants/vuex';
import Critters from 'Critterpedia/components/Critters.vue';

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
      MUTATIONS.CLEAR_FILTERS,
    ]),

    ...mapActions([
      ACTIONS.CATCH_FISH,
    ]),

    getFish () {
      if (this.fish.length) {
        return;
      }

      this.catchFish();
    },
  },
};
</script>
