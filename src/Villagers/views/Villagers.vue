<template>
  <div>
    <div class="l-wrapper">
      <div class="l-content">
        <div class="l-content__title">
          <h1>Villagers</h1>
          <p>
            There are {{ villagers.length ? villagers.length : 'many' }} villagers in the Animal Crossing universe,
            each with their own personality and hobbies. Search through them below to help create your dream team!
          </p>
        </div>
      </div>
    </div>

    <div class="l-wrapper l-wrapper--white">
      <div class="l-content">
        <div class="l-content__title">
          <h2>Your dream team</h2>
          <p>
            Add villagers to your dream team to help decide who you want on your island.
          </p>
        </div>

        <DreamTeam />
      </div>
    </div>

    <div class="l-wrapper">
      <div class="l-content">
        <div class="l-content__title">
          <h2>Browse the villagers</h2>
          <p>
            Filter through all the villagers in the game by name, species, personality and gender.
            Click on one to get a closer look at them and view general information. Add them to your dream team
            to keep track.
          </p>
        </div>
        <Gallery />
        <DetailModal />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { MODULE, ACTIONS } from 'Villagers/constants/vuex';

import Gallery from 'Villagers/components/Gallery.vue';
import DetailModal from 'Villagers/components/DetailModal.vue';
import DreamTeam from 'Villagers/components/DreamTeam.vue';

export default {
  name: 'Villagers',

  components: {
    Gallery,
    DetailModal,
    DreamTeam,
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
