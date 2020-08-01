<template>
  <button
    class="list-item"
    @click="onClick"
  >
    <div class="list-item__inner">
      <div class="list-item__status">
        <i v-if="isDonated"
           class="fa fa-check-circle"
        />
        <i v-else
           class="fa fa-times-circle"
        />
      </div>

      <div class="list-item__text">
        {{ fossil.name['name-EUen'] }}
      </div>
    </div>
  </button>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { MODULE, GETTERS, MUTATIONS } from 'Fossils/constants/vuex';

export default {
  name: 'ListItem',

  props: {
    fossil: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters(MODULE, [
      GETTERS.GET_DONATED_FOSSIL,
    ]),

    isDonated () {
      return !!this.getDonatedFossil(this.fossil['file-name']);
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
  .list-item {
    @extend %button-reset;
    width: 100%;
    padding: 0 20px;
    height: 40px;
    border-top: 2px solid black;
    color: white;
    text-align: left;
    text-transform: capitalize;

    &__inner {
      display: flex;
      align-items: center;
    }

    .fa {
      margin-right: 12px;
      font-size: 28px;
      line-height: 40px;
    }

    .fa-times-circle {
      color: #e84444;
    }

    .fa-check-circle {
      color: #62d262;
    }
  }
</style>
