<template>
  <div class="list-item-cont">
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

    <div class="list-item__checkbox">
      <div class="c-checkbox c-checkbox--small">
        <input
          :id="`list-item-donated-${fossil['file-name']}`"
          v-model="donated"
          type="checkbox"
          class="c-checkbox__input"
          @change="onDonatedChange"
        />
        <label
          :for="`list-item-donated-${fossil['file-name']}`"
          class="c-checkbox__label"
        >
          <span class="c-checkbox__checkbox"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

import { TOAST_DEFAULTS } from 'Core/constants/ui';
import { MODULE as CORE_MODULE } from 'Core/constants/vuex';
import { MODULE, GETTERS, MUTATIONS } from 'Fossils/constants/vuex';

import SyncApi from 'Core/api/SyncApi';
import PendingSync from 'Core/services/PendingSync';

export default {
  name: 'ListItem',

  props: {
    fossil: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      donated: false,
    };
  },

  created () {
    this.donated = this.isDonated;
  },

  computed: {
    ...mapState(CORE_MODULE, {
      syncId: state => state.syncId,
    }),

    ...mapGetters(MODULE, [
      GETTERS.GET_DONATED_FOSSIL,
    ]),

    isDonated () {
      return !!this.getDonatedFossil(this.fossil['file-name']);
    },
  },

  watch: {
    isDonated (newValue) {
      this.donated = newValue;
    },
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_SELECTED_FOSSIL,
      MUTATIONS.SET_DETAIL_MODAL_OPEN,
      MUTATIONS.SET_DONATED_FOSSIL_STATUS,
    ]),

    onClick () {
      this.setSelectedFossil(this.fossil);
      this.setDetailModalOpen(true);
    },

    onDonatedChange () {
      const payload = {
        id: this.fossil['file-name'],
        isDonated: this.donated,
      };

      this.setDonatedFossilStatus(payload);
      this.updateSyncDonatedFossilStatus();
    },

    async updateSyncDonatedFossilStatus () {
      if (!this.syncId) {
        return;
      }

      const method = this.donated ? SyncApi.patch : SyncApi.delete;

      try {
        await method(this.syncId, {
          donatedFossils: [this.fossil['file-name']],
        });

        this.$toasted.success('<strong>NookSync:</strong>&nbsp;Fossil updated.', TOAST_DEFAULTS);
      } catch (e) {
        PendingSync.setFossil(this.fossil, this.donated);

        this.$toasted.error('<strong>NookSync:</strong>&nbsp;Error updating fossil.', TOAST_DEFAULTS);
      }
    },
  },
};
</script>

<style lang="scss">
  .list-item-cont {
    display: flex;
    align-items: center;
    border-top: 2px solid black;
  }

  .list-item {
    @extend %button-reset;
    width: 100%;
    padding: 0 20px;
    height: 40px;
    color: white;
    text-align: left;
    text-transform: capitalize;

    &__inner {
      display: flex;
      align-items: center;
    }

    &__checkbox {
      margin-left: auto;
      margin-right: 9px;
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
