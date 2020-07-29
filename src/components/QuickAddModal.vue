<template>
  <Modal
    ref="modal"
    :is-open="isOpen"
    @close="onClose"
  >
    <template #title>
      Quick Add
    </template>

    <template #content>
      This is the content
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal.vue';
import { VUEX_MUTATIONS } from '../constants';

export default {
  name: 'QuickAddModal',

  components: {
    Modal,
  },

  computed: {
    isOpen () {
      return this.$store.state.quickAddModalOpen;
    },
  },

  methods: {
    onClose () {
      this.$store.commit(VUEX_MUTATIONS.SET_QUICK_ADD_MODAL_OPEN, false);
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
