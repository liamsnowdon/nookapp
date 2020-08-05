<template>
  <button
    class="c-button"
    :type="type"
    @click="onClick($event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',

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
  .c-button {
    position: relative;
    display: inline-block;
    padding: 11px 20px;
    border-radius: 5px;
    border: 0;
    background-color: var(--button-background-color);
    color: var(--button-text-color);
    -webkit-appearance: none;
    font-weight: 600;
    font-size: inherit;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s ease-out;
    cursor: pointer;

    &:hover {
      text-decoration: none;
      background-color: var(--button-hover-background-color);

      // Mobile hover state reset
      @media(hover: none) {
        background-color: var(--button-background-color);
      }
    }

    &:focus {
      color: var(--button-text-color);
      text-decoration: none;
      outline: none;
    }

    &:disabled,
    &.is-disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
</style>
