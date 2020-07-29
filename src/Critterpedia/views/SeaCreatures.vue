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
  name: 'SeaCreatures',

  components: {
    Critters,
  },

  beforeRouteLeave (to, from, next) {
    this.clearFilters();
    next();
  },

  mounted () {
    this.getSeaCreatures();
  },

  computed: {
    ...mapState({
      seaCreatures: state => state.seaCreatures,
    }),

    critterType () {
      return CRITTER_TYPES.SEA_CREATURES;
    },
  },

  methods: {
    ...mapMutations([
      MUTATIONS.CLEAR_FILTERS,
    ]),

    ...mapActions([
      ACTIONS.CATCH_SEA_CREATURES,
    ]),

    getSeaCreatures () {
      if (this.seaCreatures.length) {
        return;
      }

      this.catchSeaCreatures();
    },
  },
};
</script>
