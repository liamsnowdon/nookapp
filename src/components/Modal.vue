<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="modal-wrapper"
    >
      <div class="modal-overlay"></div>
      <div class="modal">
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
  props: {
    isOpen: {
      type: Boolean,
      required: true,
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
  @import '@/scss/_abstracts.scss';

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
    background-color: $brown-light;
    border-radius: 20px;
    overflow: hidden;
    z-index: 1;

    @include breakpoint(medium) {
      width: 50%;
    }

    @include breakpoint(medium, down) {
      height: 100%;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: $brown-dark;

      h3 {
        margin: 0;
      }
    }

    &__content {
      padding: 20px;

      button {
        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }

    &__section {
      &:not(:last-child) {
        margin-bottom: 25px;
      }
    }
  }
</style>
