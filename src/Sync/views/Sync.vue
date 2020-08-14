<template>
  <div class="l-wrapper">
    <div class="l-content">
      <div class="l-content__title">
        <h1>NookSync</h1>
        <p>
          With the power of NookSync, you can sync up your data of donated critters and fossils to your other devices,
          so you know exactly what you're missing, wherever you are.
        </p>
      </div>

      <template v-if="syncId">
        <p>Your NookSync ID is:</p>

        <div class="session-copy">
          <input
            class="session-copy__input"
            type="text"
            readonly
            :value="syncId"
          >

          <button
            class="session-copy__button"
            type="button"
            @click="copySyncId"
          >
            <i class="fa fa-clipboard" />
          </button>
        </div>

        <p>Enter this ID on your other devices so they will stay in sync.</p>
      </template>

      <template v-else>
        <div class="session">
          <p class="session__intro">
            It looks like you haven't set up NookSync on this device yet! If you have already set it up on another device,
            simply find your ID on it by visiting this page and enter it in the text box below. If you haven't, click the
            "Create sync" button to begin.
          </p>

          <div class="session__content">
            <Button
              class="session__create-button"
              @click="createSession"
            >
              Create NookSync session
            </Button>

            <div class="session__divider">
              <span class="session__divider-text">or</span>
            </div>

            <p>Enter your NookSync ID in the text box below.</p>

            <form @submit.prevent="setSessionFromSyncId">
              <div class="session__input-with-button">
                <input
                  v-model="existingSyncId"
                  type="text"
                  class="session__input"
                  required
                />

                <Button
                  type="submit"
                  class="session__input-button"
                >
                  Save
                </Button>
              </div>
              <span
                v-if="error"
                class="session__error"
              >
                {{ error }}
              </span>
            </form>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { MODULE, MUTATIONS } from 'Core/constants/vuex';
import Button from 'Core/components/Button.vue';
import Sync from 'Core/services/Sync';
import SyncApi from 'Core/api/SyncApi';
import Storage from 'Core/services/Storage';
import { TOAST_DEFAULTS } from 'Core/constants/ui';

export default {
  name: 'Sync',

  components: {
    Button,
  },

  data () {
    return {
      loading: false,
      existingSyncId: null,
      error: null,
    };
  },

  computed: {
    ...mapState(MODULE, {
      syncId: state => state.syncId,
    }),
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_SYNC_ID,
    ]),

    async createSession () {
      this.loading = true;

      const settings = Storage.getSettings();
      const donatedCritters = Storage.getDonatedCritters();
      const donatedFossils = Storage.getDonatedFossils();

      const payload = {
        ...donatedCritters,
        donatedFossils,
      };

      if (Object.keys(settings).length > 0) {
        payload.settings = settings;
      }

      const response = await SyncApi.create(payload);

      // todo replace with try/catch when backend status codes are done
      if (response.status === 0) {
        const session = response.data;

        Sync.setSyncIdInLocalStorage(session.id);

        this.setSyncId(session.id);

        this.$toasted.success(`<strong>NookSync:</strong>&nbsp;${session.id}`, {
          ...TOAST_DEFAULTS,
          icon: 'check',
          duration: 5000,
        });
      }
    },

    async setSessionFromSyncId () {
      this.loading = true;
      this.error = null;

      const syncId = this.existingSyncId;

      const response = await SyncApi.get(syncId);

      // todo replace with try/catch when backend status codes are done
      if (response.data.status === 0) {
        const session = response.data.data;

        Sync.setLocalStorageFromSyncSession(session);
        Sync.setAppStateFromSyncSession(session);
      } else {
        this.error = 'This NookSync ID is invalid.';
      }

      this.loading = false;
    },

    copySyncId () {
      this.$copyText(this.syncId)
        .then(() => {
          this.$toasted.global.success({
            message: 'Sync ID copied to clipboard!',
          });
        }, () => {
          this.$toasted.global.error({
            message: 'Could not copy Sync ID. Please try manually.',
          });
        });
    },
  },
};
</script>

<style lang="scss">
  .session-copy {
    display: flex;
    max-width: 400px;
    margin: 0 auto 20px;

    &__input {
      flex: 1 0 0;
      border: 0;
      padding: 20px;
      background-color: var(--button-background-color);
      color: var(--button-text-color);
      font-size: var(--global-font-size);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &__button {
      @extend %button-reset;
      padding: 14px;
      background-color: var(--button-background-color);
      color: var(--button-text-color);
      font-size: 20px;
    }
  }

  .session {
    &__intro {
      margin-bottom: 40px;
    }

    &__content {
      max-width: 650px;
      margin: 0 auto;
    }

    &__create-button {
      width: 100%;
      height: 100px;
    }

    &__divider {
      position: relative;
      margin: 20px 0;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        z-index: -1;
        height: 1px;
        background-color: white;
      }
    }

    &__divider-text {
      padding: 0 20px;
      background-color: var(--body-background-color);
    }

    &__input-with-button {
      height: 50px;
      display: flex;
    }

    &__input {
      flex: 1 0 0;
      padding: 10px;
      font-size: 16px;
      margin-right: 20px;
    }

    &__error {
      display: block;
      margin-top: 5px;
      text-align: left;
      font-size: 14px;
      font-style: italic;
    }
  }
</style>
