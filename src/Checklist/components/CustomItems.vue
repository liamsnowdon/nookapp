<template>
  <div>
    <div class="checklist-items">
      <Item
        v-for="item in items"
        :key="item.name"
        :item="item"
        :disabled="true"
      />

      <NewItem @addItem="addItem" />
    </div>

    <div>
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

  methods: {
    save () {
      const items = this.items.slice();

      this.$emit('save', items);
    },

    cancel () {
      this.items = [];

      this.$emit('cancel');
    },

    addItem (item) {
      this.items.push(item);
    },
  },
};
</script>

<style lang="scss" scoped>
  .checklist-items {
    max-width: 650px;
    margin: 0 auto;
  }
</style>
