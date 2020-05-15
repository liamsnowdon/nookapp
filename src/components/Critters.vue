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

  computed: {
    critters () {
      return this.critterType === 'fish' ? this.$store.state.fish : this.$store.state.bugs;
    },
  },
};
</script>

<style lang="scss">
  @import '@/scss/_abstracts.scss';

  .critters {
    @include breakpoint(medium) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 100%;
      height: calc(100vh - 50px);
      padding: 40px;
    }

    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 200px calc(100% - 200px);
    grid-gap: 40px;
    padding: 20px;
    background-color: #F0E6B8;
  }
</style>
