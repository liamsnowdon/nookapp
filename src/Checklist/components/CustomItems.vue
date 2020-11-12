<template>
  <div>
    <div class="checklist-items">
      <Item
        v-for="item in items"
        :key="item.name"
        :item="item"
        :checkable="false"
        @change="onChange"
      />

      <NewItem
        @addItem="addItem"
      />
    </div>

    <div class="checklist-items__buttons">
      <Button @click="save">
        Save
      </Button>

      <Button @click="cancel">
        Cancel
      </Button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import { MODULE, MUTATIONS } from 'Checklist/constants/vuex';
import CHECKLIST_TYPE from 'Checklist/constants/checklist-type';
import Button from 'Core/components/Button.vue';
import Item from 'Checklist/components/Item.vue';
import NewItem from 'Checklist/components/NewItem.vue';

export default {
  name: 'CustomItems',

  components: {
    Button,
    Item,
    NewItem,
  },

  data () {
    return {
      items: [],
    };
  },

  mounted () {
    this.setType(CHECKLIST_TYPE.CUSTOM);
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_TYPE,
    ]),

    save () {
      const items = this.items.slice();

      this.$emit('save', items);
    },

    cancel () {
      this.items = [];

      this.$emit('cancel');
    },

    addItem (item) {
      const id = this.items.length + 1;

      this.items.push({
        ...item,
        id,
      });
    },

    onChange (payload) {
      const index = this.items.findIndex(item => item.id === payload.id);

      this.items.splice(index, 1, payload);
    },
  },
};
</script>

<style lang="scss" scoped>
  .checklist-items {
    max-width: 650px;
    margin: 0 auto;
    counter-reset: checklist;

    &__buttons {
      display: flex;
      justify-content: flex-end;
      max-width: 650px;
      margin: 20px auto 0;

      button {
        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
  }
</style>
