<template>
  <div class="list-dropdown">
    <button
      class="list-dropdown__button"
      @click="isOpen = !isOpen"
    >
      {{ group.groupName }}
    </button>

    <div
      v-if="isOpen"
      class="list-dropdown__items"
    >
      <ListItem
        v-for="part in group.parts"
        :key="part['file-name']"
        :fossil="part"
        @click="selectFossil"
      />
    </div>
  </div>
</template>

<script>
import ListItem from 'Fossils/components/ListItem.vue';

export default {
  name: 'ListDropdown',

  props: {
    group: {
      type: Object,
      required: true,
    },
  },

  components: {
    ListItem,
  },

  data () {
    return {
      isOpen: false,
    };
  },

  methods: {
    selectFossil (fossil) {
      console.log(fossil);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '@/Core/scss/_abstracts.scss';

  .list-dropdown {
    &__button {
      @extend %button-reset;
      width: 100%;
      padding: 10px 20px;
      border-top: 2px solid black;
      color: white;
      text-align: left;
      text-transform: capitalize;
    }

    &__items {
      .list-item {
        padding-left: 60px;
      }
    }
  }
</style>
