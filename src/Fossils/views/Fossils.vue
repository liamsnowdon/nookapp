<template>
  <div>
    <div class="fossils">
      <div class="fossils__content">
        <div class="fossils__intro">
          <h1>Fossils</h1>
        </div>

        <List />

        <DetailModal />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { MODULE as CORE_MODULE } from 'Core/constants/vuex';
import { MODULE, MUTATIONS, ACTIONS } from 'Fossils/constants/vuex';
import List from 'Fossils/components/List.vue';
import DetailModal from 'Fossils/components/DetailModal.vue';

export default {
  name: 'Fossils',

  components: {
    List,
    DetailModal,
  },

  created () {
    this.getFossils();
  },

  mounted () {
    document.querySelector('body').classList.add('page-fossils');
  },

  destroyed () {
    document.querySelector('body').classList.remove('page-fossils');
  },

  computed: {
    ...mapState(CORE_MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
    }),

    ...mapState(MODULE, {
      fossils: state => state.fossils,
    }),
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_DONATED_FOSSILS,
    ]),

    ...mapActions(MODULE, [
      ACTIONS.DIG_FOSSILS,
    ]),

    getFossils () {
      if (this.fossils.length) {
        return;
      }

      this.digFossils();
    },
  },
};
</script>

<style lang="scss" scoped>
  .fossils {
    padding: 0 20px;

    &__content {
      max-width: var(--global-width);
      margin: 0 auto;
    }

    &__intro {
      margin-bottom: 40px;
      text-align: center;
      color: white;
    }
  }
</style>
