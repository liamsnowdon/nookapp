<template>
  <div>
    <gallery
      :critters="critters"
      :critter-type="critterType"
    />

    <DetailModal :critter-type="critterType" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { CRITTER_TYPES } from 'Critterpedia/constants/critter-types';
import { MODULE } from 'Critterpedia/constants/vuex';
import Gallery from 'Critterpedia/components/Gallery.vue';
import DetailModal from 'Critterpedia/components/DetailModal.vue';

const { mapState } = createNamespacedHelpers(MODULE);

export default {
  name: 'Critters',

  components: {
    Gallery,
    DetailModal,
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
