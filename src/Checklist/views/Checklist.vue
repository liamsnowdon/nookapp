<template>
  <div class="l-wrapper">
    <div class="l-content">
      <div class="l-content__title">
        <h1>Daily Checklist</h1>
        <p>
          Make sure you do everything you need to do with this handy daily checklist.
          Tick tasks off as you go so you don't forget anything!
        </p>

        <p v-if="!hasChecklistCreated && !createCustomListMode">
          Looks like you haven't created your checklist yet. No worries! Use the buttons below to choose between our
          default checklist or create your own one!
        </p>
      </div>

      <template v-if="hasChecklistCreated">
        <Items @change="updateSyncChecklist" />
      </template>

      <template v-else-if="createCustomListMode">
        <CustomItems
          @cancel="disableCustomListMode"
          @save="createCustomChecklist"
        />
      </template>

      <template v-else>
        <div class="checklist-buttons-cont">
          <div class="checklist-buttons">
            <div class="checklist-button">
              <button
                class="checklist-button__button"
                @click="createDefaultChecklist"
              >
                Use default checklist
                <small class="checklist-button__button-info">
                  We will create your checklist for you with the most common tasks.
                </small>
              </button>
            </div>

            <div class="checklist-button">
              <button
                class="checklist-button__button"
                @click="enableCustomListMode"
              >
                Create custom checklist
                <small class="checklist-button__button-info">
                  Create your own checklist with as many or as little tasks as you want!
                </small>
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import { mapState, mapGetters, mapMutations } from 'vuex';
import CHECKLIST_TYPE from 'Checklist/constants/checklist-type';
import DEFAULT_CHECKLIST from 'Checklist/constants/default-checklist';
import { MODULE as CORE_MODULE } from 'Core/constants/vuex';
import {
  MODULE as CHECKLIST_MODULE,
  MUTATIONS as CHECKLIST_MUTATIONS,
  GETTERS as CHECKLIST_GETTERS,
} from 'Checklist/constants/vuex';

import Items from 'Checklist/components/Items.vue';
import CustomItems from 'Checklist/components/CustomItems.vue';
import PendingSync from 'Core/services/PendingSync';
import SyncApi from 'Core/api/SyncApi';

export default {
  name: 'Checklist',

  data () {
    return {
      createCustomListMode: false,
    };
  },

  components: {
    Items,
    CustomItems,
  },

  metaInfo: {
    title: 'Daily Checklist | Tick off daily tasks to do around your island with a default or custom checklist.',
  },

  watch: {
    loadingSyncSession (newValue) {
      if (!newValue && this.isChecklistDateInThePast()) {
        this.resetCompletedStatuses();
      }
    },
  },

  mounted () {
    document.querySelector('body').classList.add('page-checklist');

    if (!this.loadingSyncSession && this.isChecklistDateInThePast()) {
      this.resetCompletedStatuses();
    }
  },

  destroyed () {
    document.querySelector('body').classList.remove('page-checklist');
  },

  computed: {
    ...mapState(CORE_MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
      syncId: state => state.syncId,
      loadingSyncSession: state => state.loadingSyncSession,
    }),

    ...mapState(CHECKLIST_MODULE, {
      checklistItems: state => state.items,
      checklistType: state => state.type,
      checklistDate: state => state.date,
    }),

    ...mapGetters(CHECKLIST_MODULE, [
      CHECKLIST_GETTERS.HAS_CHECKLIST_CREATED,
    ]),
  },

  methods: {
    ...mapMutations(CHECKLIST_MODULE, [
      CHECKLIST_MUTATIONS.SET_CHECKLIST,
    ]),

    async createDefaultChecklist () {
      const items = DEFAULT_CHECKLIST.map((item, index) => {
        return {
          id: index + 1,
          name: item,
          completed: false,
        };
      });

      this.setChecklist({
        items,
        type: CHECKLIST_TYPE.DEFAULT,
        date: new Date().toISOString(),
      });

      await this.updateSyncChecklist();
    },

    async createCustomChecklist (items) {
      items = items.map((item, index) => {
        return {
          id: index + 1,
          name: item.name,
          completed: false,
        };
      });

      this.setChecklist({
        items,
        type: CHECKLIST_TYPE.CUSTOM,
        date: new Date().toISOString(),
      });

      await this.updateSyncChecklist();

      this.createCustomListMode = false;
    },

    async updateSyncChecklist () {
      if (!this.syncId) {
        return;
      }

      const checklist = {
        items: this.checklistItems,
        type: this.checklistType,
        date: this.checklistDate,
      };

      try {
        await SyncApi.patch(this.syncId, {
          checklist,
        });

        this.$toasted.global.success({
          message: '<strong>NookSync:</strong>&nbsp;Checklist updated.',
        });
      } catch (e) {
        PendingSync.setChecklist(checklist);

        this.$toasted.global.error({
          message: '<strong>NookSync:</strong>&nbsp;Error updating checklist.',
        });
      }
    },

    /**
     * Checklist date is in the past if the current date is past it
     *
     * @returns {boolean}
     */
    isChecklistDateInThePast () {
      const checklistDate = moment(this.checklistDate);
      const checklistDateTimestamp = checklistDate.valueOf();
      const checklistDateFormat = checklistDate.format('DD-MM-YYYY');

      const currentDate = moment(new Date());
      const currentDateTimestamp = currentDate.valueOf();
      const currentDateFormat = currentDate.format('DD-MM-YYYY');

      return checklistDateTimestamp < currentDateTimestamp && checklistDateFormat !== currentDateFormat;
    },

    async resetCompletedStatuses () {
      let items = [];

      if (this.checklistType === CHECKLIST_TYPE.DEFAULT) {
        items = DEFAULT_CHECKLIST.map((item, index) => {
          return {
            id: index + 1,
            name: item,
            completed: false,
          };
        });
      } else {
        items = this.checklistItems.map(item => {
          item.completed = false;

          return item;
        });
      }

      this.setChecklist({
        items,
        type: this.checklistType,
        date: new Date().toISOString(),
      });

      await this.updateSyncChecklist();
    },

    disableCustomListMode () {
      this.createCustomListMode = false;
    },

    enableCustomListMode () {
      this.createCustomListMode = true;
    },
  },
};
</script>

<style lang="scss">
  .checklist-buttons-cont {
    max-width: 600px;
    margin: 0 auto;
  }

  .checklist-buttons {
    display: flex;
    align-items: center;
    margin: 0 -15px;

    @include breakpoint(small, down) {
      flex-direction: column;
      margin: 0;
    }
  }

  .checklist-button {
    flex: 0 0 50%;

    @include breakpoint(small) {
      height: 300px;
      padding: 0 15px;
    }

    @include breakpoint(small, down) {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }

    &__button {
      @extend %button-reset;
      width: 100%;
      height: 100%;
      padding: 40px 10px;
      background-color: var(--button-background-color);
      color: var(--global-text-color);
      border-radius: 5px;
      transition: all 0.3s ease-out;

      @include breakpoint(small) {
        padding: 10px;
      }

      &:hover {
        background-color: var(--button-hover-background-color);
      }
    }

    &__button-info {
      display: block;
      margin-top: 12px;
      line-height: 1.5;
    }
  }
</style>
