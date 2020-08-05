<template>
  <div>
    <Navigation />
    <QuickAddModal />

    <RouterView />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { MODULE as CORE_MODULE, MUTATIONS as CORE_MUTATIONS } from 'Core/constants/vuex';
import { MODULE as CRITTERPEDIA_MODULE, MUTATIONS as CRITTERPEDIA_MUTATIONS } from 'Critterpedia/constants/vuex';
import Navigation from 'Critterpedia/components/Navigation';
import QuickAddModal from 'Critterpedia/components/QuickAddModal';

export default {
  name: 'Critterpedia',

  components: {
    Navigation,
    QuickAddModal,
  },

  mounted () {
    document.querySelector('body').classList.add('page-critterpedia');
  },

  destroyed () {
    document.querySelector('body').classList.remove('page-critterpedia');
  },

  computed: {
    ...mapState(CORE_MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
    }),
  },

  methods: {
    ...mapMutations(CORE_MODULE, [
      CORE_MUTATIONS.SET_SETTINGS_HEMISPHERE,
    ]),

    ...mapMutations(CRITTERPEDIA_MODULE, [
      CRITTERPEDIA_MUTATIONS.SET_DONATED_FISH,
      CRITTERPEDIA_MUTATIONS.SET_DONATED_BUGS,
      CRITTERPEDIA_MUTATIONS.SET_DONATED_SEA_CREATURES,
    ]),
  },
};
</script>
