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
      selectedCritter: {},
    };
  },

  computed: {
    critters () {
      return this.critterType === 'fish' ? this.$store.state.fish : this.$store.state.bugs;
    },
  },

  methods: {
    setSelectedCritter (critter) {
      if (this.selectedCritter.name === critter.name) {
        return;
      }

      this.selectedCritter = critter;
    },
  },
};
</script>

<style scoped lang="scss">
  .critters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100%;
    grid-gap: 40px;
    padding: 40px;
    max-height: 80vh;
    background-color: #F0E6B8;
  }
</style>
