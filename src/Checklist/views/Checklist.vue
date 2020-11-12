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
        <Items />
      </template>

      <template v-else-if="createCustomListMode">
        <CustomItems
          @cancel="disableCustomListMode"
          @save="createCustomChecklist"
        />
      </template>

      <template v-else>
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

          <div class="checklist-buttons__divider">
            or
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
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import { mapState, mapGetters, mapMutations } from 'vuex';
import { STORAGE } from 'Checklist/constants/storage';
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

  created () {
    this.setChecklistFromLocalStorage();
  },

  mounted () {
    document.querySelector('body').classList.add('page-checklist');

    if (this.isChecklistDateInThePast()) {
      this.resetCompletedStatuses();
      this.setChecklistDate();
    }
  },

  destroyed () {
    document.querySelector('body').classList.remove('page-checklist');
  },

  computed: {
    ...mapState(CORE_MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
    }),

    ...mapGetters(CHECKLIST_MODULE, [
      CHECKLIST_GETTERS.HAS_CHECKLIST_CREATED,
    ]),
  },

  methods: {
    ...mapMutations(CHECKLIST_MODULE, [
      CHECKLIST_MUTATIONS.SET_ITEMS,
      CHECKLIST_MUTATIONS.RESET_ITEMS,
    ]),

    setChecklistFromLocalStorage () {
      if (!this.isStorageAvailable) {
        return;
      }

      const checklist = JSON.parse(localStorage.getItem(STORAGE.CHECKLIST));

      this.setItems({
        items: checklist ? checklist.items : [],
        type: checklist ? checklist.type : CHECKLIST_TYPE.DEFAULT,
      });
    },

    createDefaultChecklist () {
      const items = DEFAULT_CHECKLIST.map((item, index) => {
        return {
          id: index + 1,
          name: item,
          completed: false,
        };
      });

      this.setItems({
        items,
        type: CHECKLIST_TYPE.DEFAULT,
        setDate: true,
      });
    },

    createCustomChecklist (items) {
      items = items.map((item, index) => {
        return {
          id: index + 1,
          name: item.name,
          completed: false,
        };
      });

      this.setItems({
        items,
        type: CHECKLIST_TYPE.CUSTOM,
        setDate: true,
      });

      this.createCustomListMode = false;
    },

    /**
     * Checklist date is in the past if the current date is past it
     *
     * @returns {boolean}
     */
    isChecklistDateInThePast () {
      const checklistDate = moment(JSON.parse(localStorage.getItem(STORAGE.CHECKLIST_DATE)));
      const checklistDateTimestamp = checklistDate.valueOf();
      const checklistDateDay = checklistDate.date();

      const currentDate = moment(new Date());
      const currentDateTimestamp = currentDate.valueOf();
      const currentDateDay = currentDate.date();

      return checklistDateTimestamp < currentDateTimestamp && checklistDateDay < currentDateDay;
    },

    resetCompletedStatuses () {
      this.resetItems();
    },

    setChecklistDate () {
      localStorage.setItem(STORAGE.CHECKLIST_DATE, JSON.stringify(new Date()));
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
  .checklist-buttons {
    display: flex;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .checklist-button {
    flex: 0 0 50%;
    height: 300px;
    padding: 0 15px;

    &__button {
      @extend %button-reset;
      width: 100%;
      height: 100%;
      padding: 10px;
      background-color: #569a52;
      color: var(--global-text-color);
      border-radius: 5px;
    }

    &__button-info {
      display: block;
      margin-top: 12px;
      line-height: 1.5;
    }
  }
</style>
