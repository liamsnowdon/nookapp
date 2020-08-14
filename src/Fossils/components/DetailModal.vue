<template>
  <Modal
    ref="modal"
    :is-open="isOpen"
    size="large"
    @close="onClose"
  >
    <template #title>
      {{ fossil.name['name-EUen'] | capitalize }}
    </template>

    <template #content>
      <div class="c-checkbox">
        <input
          id="available-now"
          v-model="isDonated"
          type="checkbox"
          class="c-checkbox__input"
          @change="onDonatedChange"
        />
        <label
          for="available-now"
          class="c-checkbox__label"
        >
          <span class="c-checkbox__checkbox"></span>
          <span class="c-checkbox__checkbox-text">Donated</span>
        </label>
      </div>

      <div class="fossil">
        <div class="fossil__image">
          <div class="fossil__image-cont">
            <img
              :src="fossil.image_uri"
              :alt="fossil.name['name-EUen']"
            />
          </div>
        </div>

        <div class="fossil__information">
          <h2 class="text-capitalize">{{ fossil.name['name-EUen'] }}</h2>

          <blockquote class="fossil__quote">{{ fossil['museum-phrase'] }}</blockquote>

          <p>Price: <strong>{{ fossil.price }}</strong></p>
          <p v-if="isPartOf">Part of: <strong>{{ fossil['part-of'] | capitalize }}</strong></p>

          <template v-if="isPartOf">
            <hr>

            <h3>Related Parts</h3>

            <PartButton
              v-for="part in relatedParts"
              :key="part['file-name']"
              :part="part"
              @click="goToRelatedPart(part)"
            />
          </template>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

import { MODULE as CORE_MODULE } from 'Core/constants/vuex';
import { MODULE, GETTERS, MUTATIONS } from 'Fossils/constants/vuex';
import { TOAST_DEFAULTS } from 'Core/constants/ui';

import Modal from 'Core/components/Modal.vue';
import PartButton from 'Fossils/components/PartButton.vue';

import SyncApi from 'Core/api/SyncApi';
import PendingSync from 'Core/services/PendingSync';

export default {
  name: 'DetailModal',

  data () {
    return {
      isDonated: false,
    };
  },

  components: {
    Modal,
    PartButton,
  },

  computed: {
    ...mapState(CORE_MODULE, {
      syncId: state => state.syncId,
    }),

    ...mapState(MODULE, {
      fossil: state => state.selectedFossil,
      fossils: state => state.fossils,
      isOpen: state => state.detailModalOpen,
    }),

    ...mapGetters(MODULE, [
      GETTERS.GET_DONATED_FOSSIL,
    ]),

    isPartOf () {
      return !!this.fossil['part-of'];
    },

    relatedParts () {
      if (!this.isPartOf) {
        return [];
      }

      return this.fossils.filter(fossil => fossil['part-of'] === this.fossil['part-of'] &&
        fossil['file-name'] !== this.fossil['file-name']);
    },
  },

  watch: {
    fossil (newFossil) {
      this.isDonated = !!this.getDonatedFossil(newFossil['file-name']);
    },
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_DETAIL_MODAL_OPEN,
      MUTATIONS.SET_SELECTED_FOSSIL,
      MUTATIONS.SET_DONATED_FOSSIL_STATUS,
    ]),

    onClose () {
      this.setDetailModalOpen(false);
      this.setSelectedFossil({});
    },

    goToRelatedPart (fossil) {
      this.setSelectedFossil(fossil);
    },

    onDonatedChange () {
      const payload = {
        id: this.fossil['file-name'],
        isDonated: this.isDonated,
      };

      this.setDonatedFossilStatus(payload);
      this.updateSyncDonatedFossilStatus();
    },

    async updateSyncDonatedFossilStatus () {
      if (!this.syncId) {
        return;
      }

      const method = this.isDonated ? SyncApi.patch : SyncApi.delete;

      try {
        await method(this.syncId, {
          donatedFossils: [this.fossil['file-name']],
        });

        this.$toasted.success('<strong>NookSync:</strong>&nbsp;Fossil donated status updated.', {
          ...TOAST_DEFAULTS,
          icon: 'check',
        });
      } catch (e) {
        PendingSync.setFossil(this.fossil, this.isDonated);

        this.$toasted.error('<strong>NookSync:</strong>&nbsp;Error updating fossil donated status.', {
          ...TOAST_DEFAULTS,
          icon: 'times',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  hr {
    margin: 25px 0;
  }

  .c-checkbox {
    margin-bottom: 20px;
  }

  .fossil {
    display: flex;

    @include breakpoint(medium) {
      margin: 0 -16px;
    }

    @include breakpoint(medium, down) {
      height: calc(100% - 40px);
      flex-direction: column;
    }

    &__image,
    &__information {
      @include breakpoint(medium) {
        flex: 0 0 50%;
        padding: 0 16px;
      }
    }

    &__image {
      display: flex;
      align-items: center;
      justify-content: center;

      @include breakpoint(medium) {
        flex: 0 0 300px;
      }
    }

    &__information {
      @include breakpoint(medium) {
        flex: 1 0 0;
      }
    }

    &__quote {
      margin: 0 0 30px 0;
      padding-left: 40px;
      border-left: 5px solid white;

      &::before,
      &::after {
        content: '"';
        position: relative;
      }
    }
  }
</style>
