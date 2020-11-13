<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="modal-wrapper"
    >
      <div class="modal-overlay"></div>
      <div
        :class="`modal--${size}`"
        class="modal"
      >
        <div class="modal__header">
          <h3><slot name="title"></slot></h3>
          <button class="cross" @click="close"></button>
        </div>
        <div class="modal__content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },

    size: {
      type: String,
      required: false,
      default: 'medium',
    },
  },

  methods: {
    close () {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .modal-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
  }

  .modal {
    width: 100%;
    max-height: 100vh;
    background-color: var(--modal-background-color);
    color: var(--modal-text-color);
    z-index: 1;

    @include breakpoint(medium) {
      width: 50%;
      border-radius: 20px;
    }

    @include breakpoint(medium, down) {
      height: 100%;
    }

    &--large {
      @include breakpoint(medium) {
        width: 80%;
      }
    }

    &--small {
      @include breakpoint(medium) {
        width: 25%;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      padding: 0 20px;
      background-color: var(--modal-header-background-color);

      @include breakpoint(medium) {
        border-radius: 20px 20px 0 0;
      }

      h3 {
        margin: 0;
      }
    }

    &__content {
      position: relative;
      z-index: 1;
      padding: 20px;
      max-height: calc(100vh - 70px);
      overflow-y: auto;

      // Fixes the menu bar on iOS devices.
      @include breakpoint(small, down) {
        padding-bottom: 100px;
      }
    }

    &__section {
      &:not(:last-child) {
        margin-bottom: 25px;
      }
    }

    &__buttons {
      @include breakpoint(medium, down) {
        button {
          width: 100%;

          &:not(:last-child) {
            margin: 0 0 15px 0;
          }
        }
      }

      @include breakpoint(medium) {
        button {
          margin: 0 15px 15px 0;
        }
      }
    }
  }
</style>
