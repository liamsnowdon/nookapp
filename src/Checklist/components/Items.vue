<template>
  <div class="checklist-items">
    <Item
      v-for="item in items"
      :key="item.name"
      :item="item"
      :editable="isEditable"
      @change="onChange"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { MODULE, MUTATIONS } from 'Checklist/constants/vuex';
import Item from 'Checklist/components/Item.vue';
import CHECKLIST_TYPE from 'Checklist/constants/checklist-type';

export default {
  name: 'Items',

  components: {
    Item,
  },

  computed: {
    ...mapState(MODULE, {
      items: state => state.items,
      type: state => state.type,
      date: state => state.date,
    }),

    isEditable () {
      return this.type === CHECKLIST_TYPE.CUSTOM;
    },
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_CHECKLIST,
    ]),

    onChange (item) {
      const items = this.items.slice();
      const index = items.findIndex(i => i.id === item.id);

      if (index === -1) {
        return;
      }

      items.splice(index, 1, item);

      this.setChecklist({
        items,
        type: this.type,
        date: this.date,
      });

      this.$emit('change');
    },
  },
};
</script>

<style lang="scss" scoped>
  .checklist-items {
    max-width: 650px;
    margin: 0 auto;
    counter-reset: checklist;
  }
</style>
