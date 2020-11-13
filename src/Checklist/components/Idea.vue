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
      <i class="fa fa-plus" />
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

<style lang="scss">
  .idea {
    $block: &;

    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;

    &.is-added {
      text-decoration: line-through;

      #{$block}__add {
        opacity: 0.5;
      }
    }

    &__add {
      @extend %button-reset;
      color: white;
      font-size: 30px;
    }
  }
</style>
