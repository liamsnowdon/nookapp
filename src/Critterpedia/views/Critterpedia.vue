<template>
  <div>
    <Navigation />
    <QuickAddModal />

    <RouterView />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { MODULE } from 'Core/constants/vuex';
import Navigation from 'Critterpedia/components/Navigation';
import QuickAddModal from 'Critterpedia/components/QuickAddModal';

export default {
  name: 'Critterpedia',

  components: {
    Navigation,
    QuickAddModal,
  },

  metaInfo: {
    title: 'Critterpedia | Look up all information about bugs, fish and sea creatures.',
  },

  mounted () {
    document.querySelector('body').classList.add('page-critterpedia');
  },

  destroyed () {
    document.querySelector('body').classList.remove('page-critterpedia');
  },

  computed: {
    ...mapState(MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
    }),
  },
};
</script>
