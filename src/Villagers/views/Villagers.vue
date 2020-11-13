<template>
  <div>
    <div class="l-wrapper">
      <div class="l-content">
        <div class="l-content__title">
          <h1>Villagers</h1>
          <p>
            There are {{ villagers.length ? villagers.length : 'many' }} villagers in the Animal Crossing universe,
            each with their own personality and hobbies.
          </p>

          <p>
            Search through them below using the filters to help create your dream team!
          </p>
        </div>
      </div>

      <Gallery />
      <DetailModal />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { MODULE, ACTIONS } from 'Villagers/constants/vuex';

import Gallery from 'Villagers/components/Gallery.vue';
import DetailModal from 'Villagers/components/DetailModal.vue';

export default {
  name: 'Villagers',

  components: {
    Gallery,
    DetailModal,
  },

  metaInfo () {
    return {
      title: `Villagers | Look through all ${this.villagers.length ? this.villagers.length : 'the'} villagers and create your dream team based on species, personality, and more!`,
    };
  },

  created () {
    if (this.villagers.length) {
      return;
    }

    this.getVillagers();
  },

  mounted () {
    document.querySelector('body').classList.add('page-villagers');
  },

  destroyed () {
    document.querySelector('body').classList.remove('page-villagers');
  },

  computed: {
    ...mapState(MODULE, {
      villagers: state => state.villagers,
    }),
  },

  methods: {
    ...mapActions(MODULE, [
      ACTIONS.GET_VILLAGERS,
    ]),
  },
};
</script>

<style scoped>

</style>
