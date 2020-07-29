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
  name: 'Bugs',

  components: {
    Critters,
  },

  beforeRouteLeave (to, from, next) {
    this.clearFilters();
    next();
  },

  mounted () {
    this.getBugs();
  },

  computed: {
    ...mapState({
      bugs: state => state.bugs,
    }),

    critterType () {
      return CRITTER_TYPES.BUGS;
    },
  },

  methods: {
    ...mapMutations([
      MUTATIONS.CLEAR_FILTERS,
    ]),

    ...mapActions([
      ACTIONS.CATCH_BUGS,
    ]),

    getBugs () {
      if (this.bugs.length) {
        return;
      }

      this.catchBugs();
    },
  },
};
</script>
