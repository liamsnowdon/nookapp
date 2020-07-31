<template>
  <div>
    <div class="fossils">
      <div class="fossils__content">
        <div class="fossils__intro">
          <h1>Fossils</h1>
          <p>This is the fossils pages.</p>
        </div>

        <List />

        <DetailModal />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { MODULE, ACTIONS } from 'Fossils/constants/vuex';
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
    document.querySelector('body').style.backgroundColor = '#27273e';
  },

  destroyed () {
    document.querySelector('body').style.backgroundColor = '';
  },

  computed: {
    ...mapState(MODULE, {
      fossils: state => state.fossils,
    }),
  },

  methods: {
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
  @import '@/Core/scss/_abstracts.scss';

  ::v-deep {
    .modal {
      background-color: #4c4c65;
      color: white;

      &__header {
        background-color: #1b1b2f;
      }

      .cross {
        &::before,
        &::after {
          background-color: white;
        }
      }
    }
  }

  .fossils {
    &__content {
      max-width: $global-width;
      margin: 0 auto;
    }

    &__intro {
      text-align: center;
    }
  }
</style>
