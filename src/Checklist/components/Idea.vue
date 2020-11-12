<template>
  <li
    :class="{'is-added': isAdded}"
    class="idea"
  >
    {{ idea }}

    <button
      class="idea__add"
      :disabled="isAdded"
      @click="onClick"
    >
      Add
    </button>
  </li>
</template>

<script>
export default {
  name: 'Idea',

  props: {
    idea: {
      type: String,
      required: true,
    },

    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    isAdded () {
      return this.items.findIndex(item => item.name.toLowerCase() === this.idea.toLowerCase()) !== -1;
    },
  },

  methods: {
    onClick () {
      this.$emit('add', this.idea);
    },
  },
};
</script>

<style lang="scss" scoped>
  .idea {
    &.is-added {
      text-decoration: line-through;
     }
  }
</style>
