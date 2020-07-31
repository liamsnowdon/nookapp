<template>
  <button
    class="list-item"
    @click="onClick"
  >
    {{ fossil.name['name-EUen'] }}
  </button>
</template>

<script>
import { mapMutations } from 'vuex';
import { MODULE, MUTATIONS } from 'Fossils/constants/vuex';

export default {
  name: 'ListItem',

  props: {
    fossil: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_SELECTED_FOSSIL,
      MUTATIONS.SET_DETAIL_MODAL_OPEN,
    ]),

    onClick () {
      this.setSelectedFossil(this.fossil);
      this.setDetailModalOpen(true);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '@/Core/scss/_abstracts.scss';

  .list-item {
    @extend %button-reset;
    width: 100%;
    padding: 10px 20px;
    border-top: 2px solid black;
    color: white;
    text-align: left;
    text-transform: capitalize;
  }
</style>
