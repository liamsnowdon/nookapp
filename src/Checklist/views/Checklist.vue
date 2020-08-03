<template>
  <div>
    <h1>Daily Checklist</h1>

    <template v-if="hasChecklistCreated">
      <Items />
    </template>

    <template v-else-if="createCustomListMode">
      Create new one now

      <Button @click="createCustomListMode = false">
        Cancel
      </Button>
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
  },

  created () {
    this.setChecklistFromLocalStorage();
  },

  mounted () {
    document.querySelector('body').classList.add('page-index'); // todo change
  },

  destroyed () {
    document.querySelector('body').classList.remove('page-index'); // todo change
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
      this.setItems(DEFAULT_CHECKLIST);
    },
  },
};
</script>

<style lang="scss">

</style>
