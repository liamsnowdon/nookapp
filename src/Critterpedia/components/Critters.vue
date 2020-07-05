<template>
  <div class="critters">
    <gallery
      :critters="critters"
      :critter-type="critterType"
    />
    <detail
      :critter-type="critterType"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { CRITTER_TYPES, MODULE } from '../constants';
import Gallery from './Gallery.vue';
import Detail from './Detail.vue';

const { mapState } = createNamespacedHelpers(MODULE);

export default {
  name: 'Critters',

  components: {
    Gallery,
    Detail,
  },

  props: {
    critterType: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState({
      fish: state => state.fish,
      bugs: state => state.bugs,
      seaCreatures: state => state.seaCreatures,
    }),

    critters () {
      switch (this.critterType) {
        case CRITTER_TYPES.FISH:
          return this.fish;
        case CRITTER_TYPES.BUGS:
          return this.bugs;
        default:
          return this.seaCreatures;
      }
    },
  },
};
</script>

<style lang="scss">
  @import '@/Core/scss/_abstracts.scss';

  .critters {
    @include breakpoint(medium) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 100%;
      height: calc(100vh - 50px);
      padding: 40px;
    }

    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 260px calc(100% - 260px);
    grid-gap: 40px;
    padding: 20px;
    max-width: $global-width;
    margin: 0 auto;
  }
</style>
