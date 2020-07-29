<template>
  <button
    class="c-button"
    @click="onClick($event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',

  methods: {
    onClick (e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss">
  @import 'Core/scss/_abstracts.scss';

  .c-button {
    position: relative;
    display: inline-block;
    padding: 11px 20px;
    border-radius: 5px;
    border: 0;
    background-color: $brown-medium;
    color: black;
    -webkit-appearance: none;
    font-weight: 600;
    font-size: inherit;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s ease-out;
    cursor: pointer;

    &:hover {
      text-decoration: none;
      background-color: $brown-dark;

      // Mobile hover state reset
      @media(hover: none) {
        background-color: $brown-medium;
      }
    }

    &:focus {
      color: black;
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
