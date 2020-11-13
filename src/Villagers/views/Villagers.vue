<template>
  <div>
    <div class="l-wrapper">
      <div class="l-content">
        <div class="l-content__title">
          <h1>Villagers</h1>
          <p>
            Villagers intro text
          </p>
        </div>
      </div>

      <Gallery />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { MODULE, ACTIONS } from 'Villagers/constants/vuex';

import Gallery from 'Villagers/components/Gallery.vue';

export default {
  name: 'Villagers',

  components: {
    Gallery,
  },

  metaInfo () {
    return {
      title: `Villagers | Look through all ${this.villagers.length ? this.villagers.length : 'the'} villagers and create your dream team based on species, personality, and more!`,
    };
  },

  created () {
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
