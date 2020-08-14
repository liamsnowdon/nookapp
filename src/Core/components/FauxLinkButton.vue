<template>
  <button
    class="c-faux-link-button"
    :type="type"
    @click="onClick($event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'FauxLinkButton',

  props: {
    type: {
      type: String,
      required: false,
      default: 'button',
    },
  },

  methods: {
    onClick (e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss">
  .c-faux-link-button {
    @extend %button-reset;
    color: var(--global-text-color);
    text-decoration: underline;

    &:disabled,
    &.is-disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
</style>
