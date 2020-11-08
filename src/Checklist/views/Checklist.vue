<template>
  <div class="l-wrapper">
    <div class="l-content">
      <div class="l-content__title">
        <h1>Daily Checklist</h1>
      </div>

      <template v-if="hasChecklistCreated">
        <Items />
      </template>

      <template v-else-if="createCustomListMode">
        <CustomItems
          @cancel="createCustomListMode = false"
          @save="saveCustomChecklist"
        />
      </template>

      <template v-else>
        <Button
          @click="createDefaultChecklist"
        >
          Use default checklist
        </Button>

        <Button
          @click="createCustomListMode = true"
        >
          Create custom checklist
        </Button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { STORAGE } from 'Checklist/constants/storage';
import { MODULE as CORE_MODULE } from 'Core/constants/vuex';
import {
  MODULE as CHECKLIST_MODULE,
  MUTATIONS as CHECKLIST_MUTATIONS,
  GETTERS as CHECKLIST_GETTERS,
} from 'Checklist/constants/vuex';
import DEFAULT_CHECKLIST from 'Checklist/constants/default-checklist';

import Button from 'Core/components/Button.vue';
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
    Button,
    Items,
    CustomItems,
  },

  created () {
    this.setChecklistFromLocalStorage();
  },

  mounted () {
    document.querySelector('body').classList.add('page-checklist');
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
    ]),

    setChecklistFromLocalStorage () {
      if (!this.isStorageAvailable) {
        return;
      }

      const checklist = JSON.parse(localStorage.getItem(STORAGE.CHECKLIST_ITEMS));

      this.setItems(checklist);
    },

    createDefaultChecklist () {
      const items = DEFAULT_CHECKLIST.map((item, index) => {
        return {
          id: index + 1,
          name: item,
          completed: false,
        };
      });

      this.setItems(items);
    },

    saveCustomChecklist (items) {
      items = items.map((item, index) => {
        return {
          id: index + 1,
          name: item.name,
          completed: false,
        };
      });

      this.setItems(items);

      this.createCustomListMode = false;
    },
  },
};
</script>

<style lang="scss">

</style>
