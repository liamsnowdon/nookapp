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
      VUEX_MUTATIONS.CLEAR_FILTERS,
    ]),

    ...mapActions([
      VUEX_ACTIONS.CATCH_BUGS,
    ]),

    getBugs () {
      if (Object.keys(this.bugs).length) {
        return;
      }

      this.catchBugs();
    },
  },
};
</script>
