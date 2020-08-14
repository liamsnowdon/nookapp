<template>
  <div id="app">
    <Navigation />

    <RouterView />

    <Footer />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import { storageAvailable } from 'Core/helpers';
import { MODULE, MUTATIONS } from 'Core/constants/vuex';
import { TOAST_DEFAULTS } from 'Core/constants/ui';

import Navigation from 'Core/components/Navigation.vue';
import Footer from 'Core/components/Footer.vue';

import PendingSync from 'Core/services/PendingSync';
import Sync from 'Core/services/Sync';
import SyncApi from 'Core/api/SyncApi';

// App styles
import 'vue-multiselect/dist/vue-multiselect.min.css';
import 'Core/scss/app.scss';

export default {
  name: 'App',

  components: {
    Navigation,
    Footer,
  },

  created () {
    this.checkDeviceForStorageApi();

    this.setAppState();
  },

  computed: {
    ...mapState(MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
      syncId: state => state.syncId,
    }),
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_IS_STORAGE_AVAILABLE,
      MUTATIONS.SET_LOADING_SYNC_SESSION,
    ]),

    checkDeviceForStorageApi () {
      if (storageAvailable('localStorage')) {
        this.setIsStorageAvailable(true);
      } else {
        this.setIsStorageAvailable(false);
      }
    },

    /**
     * This interval runs every 60 seconds to attempt to update the sync session if it's out of sync.
     *
     * @see PendingSync
     */
    setIntervalForPendingSyncItems () {
      setInterval(async () => {
        const pendingSync = PendingSync.get();

        if (!pendingSync) {
          return;
        }

        try {
          await PendingSync.attemptSyncUpdateFromPendingSync(this.syncId);

          PendingSync.clear();

          this.$toasted.success('<strong>NookSync:</strong>&nbsp;Successfully updated from pending items.', {
            ...TOAST_DEFAULTS,
            icon: 'check',
          });
        } catch (e) {
          this.$toasted.error('<strong>NookSync:</strong>&nbsp;Error updating NookSync from pending items', {
            ...TOAST_DEFAULTS,
            icon: 'times',
          });
        }
      }, 60000);
    },

    async setAppState () {
      if (!this.isStorageAvailable) {
        return;
      }

      const syncId = Sync.getSyncIdFromLocalStorage();
      const pendingSync = PendingSync.get();

      if (syncId) {
        this.setLoadingSyncSession(true);

        // Try and update Sync session with pending sync items
        if (pendingSync) {
          try {
            await PendingSync.attemptSyncUpdateFromPendingSync(syncId);

            PendingSync.clear();

            this.$toasted.success('<strong>NookSync:</strong>&nbsp;Successfully updated from pending items.', {
              ...TOAST_DEFAULTS,
              icon: 'check',
            });
          } catch {
            this.$toasted.error('<strong>NookSync:</strong>&nbsp;Error updating NookSync from pending items', {
              ...TOAST_DEFAULTS,
              icon: 'times',
            });
          }
        }

        const session = await SyncApi.get(syncId);

        Sync.setAppStateFromSyncSession(session.data.data);
        Sync.setLocalStorageFromSyncSession(session.data.data);

        this.setLoadingSyncSession(false);
      } else {
        Sync.setAppStateFromLocalStorage();
      }

      this.setIntervalForPendingSyncItems();
    },
  },
};
</script>
