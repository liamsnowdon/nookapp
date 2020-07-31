<template>
  <Modal
    ref="modal"
    :is-open="isOpen"
    size="large"
    @close="onClose"
  >
    <template #title>
      {{ fossil.name['name-EUen'] }}
    </template>

    <template #content>
      <div class="fossils__detail">
        <template v-if="fossil['file-name']">
          Name: {{ fossil.name['name-EUen'] }}

          <img
            :src="fossil.image_uri"
            :alt="fossil.name['name-EUen']"
          />
        </template>
      </div>
    </template>
  </Modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { MODULE, MUTATIONS } from 'Fossils/constants/vuex';
import Modal from 'Core/components/Modal.vue';

export default {
  name: 'DetailModal',

  components: {
    Modal,
  },

  computed: {
    ...mapState(MODULE, {
      fossil: state => state.selectedFossil,
      isOpen: state => state.detailModalOpen,
    }),
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_DETAIL_MODAL_OPEN,
      MUTATIONS.SET_SELECTED_FOSSIL,
    ]),

    onClose () {
      this.setDetailModalOpen(false);
      this.setSelectedFossil({});
    },
  },
};
</script>

<style lang="scss">

</style>
