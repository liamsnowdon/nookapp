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
import { STORAGE } from 'Fossils/constants/storage';

export default {
  name: 'Fossils',

  components: {
    List,
    DetailModal,
  },

  created () {
    this.getFossils();

    this.setDonatedFossilsFromLocalStorage();
  },

  mounted () {
    document.querySelector('body').style.backgroundColor = '#27273e';
  },

  destroyed () {
    document.querySelector('body').style.backgroundColor = '';
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

    setDonatedFossilsFromLocalStorage () {
      if (!this.isStorageAvailable) {
        return;
      }

      let donatedFossils = localStorage.getItem(STORAGE.DONATED_FOSSILS);

      if (donatedFossils) {
        donatedFossils = donatedFossils.split(',');
      }

      this.setDonatedFossils(donatedFossils);
    },
  },
};
</script>

<style lang="scss" scoped>
  // todo v-deep styles for per page changes should be moved to CSS Custom Properties
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

    .c-checkbox {
      &__input {
        &:checked {
          + .c-checkbox__label {
            .c-checkbox__checkbox {
              border-color: #1b1b2f;
            }
          }
        }
      }

      &__checkbox {
        &::before,
        &::after {
          background-color: #1b1b2f;
        }
      }
    }

    .spinner {
      &::after {
        border: 6px solid white;
        border-color: white transparent white transparent;
      }
    }
  }

  .fossils {
    padding: 0 20px;

    &__content {
      max-width: $global-width;
      margin: 0 auto;
    }

    &__intro {
      margin-bottom: 40px;
      text-align: center;
      color: white;
    }
  }
</style>
