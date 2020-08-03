<template>
  <div>
    <Item
      v-for="item in items"
      :key="item.name"
      :item="item"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { MODULE } from 'Checklist/constants/vuex';
import Item from 'Checklist/components/Item.vue';

export default {
  name: 'Items',

  components: {
    Item,
  },

  computed: {
    ...mapState(MODULE, {
      items: state => state.items,
    })
  }
};
</script>

<style lang="scss" scoped>

</style>
