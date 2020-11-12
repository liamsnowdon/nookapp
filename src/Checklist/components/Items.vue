<template>
  <div class="checklist-items">
    <Item
      v-for="item in items"
      :key="item.name"
      :item="item"
      @change="onChange"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { MODULE, MUTATIONS } from 'Checklist/constants/vuex';
import Item from 'Checklist/components/Item.vue';

export default {
  name: 'Items',

  components: {
    Item,
  },

  computed: {
    ...mapState(MODULE, {
      items: state => state.items,
    }),
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_ITEM,
    ]),

    onChange (payload) {
      this.setItem(payload);
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
