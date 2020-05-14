<template>
  <div class="critters">
    <gallery
      :critters="critters"
      :critter-type="critterType"
      @setSelectedCritter="setSelectedCritter"
    />
    <detail
      :selected-critter="selectedCritter"
      :critter-type="critterType"
    />
  </div>
</template>

<script>
import Gallery from '@/components/Gallery.vue';
import Detail from '@/components/Detail.vue';
import Fish from '@/data/fish';
import Bugs from '@/data/bugs';

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

  data () {
    return {
      critters: [],
      selectedCritter: {},
    };
  },

  mounted () {
    this.setCritters();
  },

  methods: {
    setCritters () {
      switch (this.critterType) {
        case 'fish':
          this.critters = Fish;
          break;
        case 'bugs':
          this.critters = Bugs;
          break;
        default:
          break;
      }
    },

    setSelectedCritter (critter) {
      this.selectedCritter = critter;
    },
  },
};
</script>

<style scoped lang="scss">
  .critters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
  }
</style>
