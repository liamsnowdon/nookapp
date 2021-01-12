<template>
  <Modal
    ref="modal"
    :is-open="isOpen"
    @close="onClose"
  >
    <template #title>
      {{ villager.name['name-EUen'] | capitalize }}
    </template>

    <template #content>
      <div class="villager">
        <div  class="villager__left">
          <div class="villager__image">
            <img
              :src="`https://acnhapi.com/v1/images/villagers/${villager.id}`"
              :alt="villager.name['name-EUen']"
            />
          </div>

          <div class="villager__button">
            <Button
              v-if="isInDreamTeam"
              @click="removeFromDreamTeam"
            >
              Remove from dream team
            </Button>
            <Button
              v-else
              :disabled="!canHaveMoreDreamTeamVillagers"
              @click="addToDreamTeam"
            >
              Add to dream team
            </Button>

            <small
              v-if="!canHaveMoreDreamTeamVillagers && !isInDreamTeam"
              class="d-block mt-15"
            >
              Your dream team has no more space! You need to remove someone else before adding {{ villager.name['name-EUen'] }}.
            </small>
          </div>
        </div>

        <div class="villager__right">
          <div class="villager__info">
            <h3>{{ villager.name['name-EUen'] | capitalize }}</h3>

            <blockquote class="villager__quote">{{ villager.saying }}</blockquote>

            <p class="mb-0"><strong>Species:</strong> {{ villager.species }}</p>
            <p class="mb-0"><strong>Personality:</strong> {{ villager.personality }}</p>
            <p class="mb-0"><strong>Gender:</strong> {{ villager.gender }}</p>

            <p class="mb-0"><strong>Birthday:</strong> {{ villager['birthday-string'] }}</p>
            <p class="mb-0"><strong>Hobby:</strong> {{ villager.hobby }}</p>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

import { MODULE as CORE_MODULE } from 'Core/constants/vuex';

import { MODULE, MUTATIONS, GETTERS } from 'Villagers/constants/vuex';

import Modal from 'Core/components/Modal.vue';
import Button from 'Core/components/Button.vue';
import SyncApi from 'Core/api/SyncApi';
import PendingSync from 'Core/services/PendingSync';

export default {
  name: 'DetailModal',

  components: {
    Modal,
    Button,
  },

  computed: {
    ...mapState(CORE_MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
      syncId: state => state.syncId,
    }),

    ...mapState(MODULE, {
      isOpen: state => state.detailModalOpen,
      selectedVillager: state => state.selectedVillager,
      dreamTeam: state => state.dreamTeam,
    }),

    ...mapGetters(MODULE, [
      GETTERS.CAN_HAVE_MORE_DREAM_TEAM_VILLAGERS,
    ]),

    villager () {
      return this.selectedVillager;
    },

    isInDreamTeam () {
      return this.dreamTeam.includes(this.villager.id);
    },
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_DETAIL_MODAL_OPEN,
      MUTATIONS.SET_SELECTED_VILLAGER,
      MUTATIONS.SET_DREAM_TEAM,
    ]),

    addToDreamTeam () {
      const dreamTeam = this.dreamTeam.slice();

      dreamTeam.push(this.villager.id);

      this.setDreamTeam(dreamTeam);
      this.updateSyncDreamTeam();
    },

    removeFromDreamTeam () {
      const dreamTeam = this.dreamTeam.slice();
      const index = dreamTeam.findIndex(villager => villager === this.villager.id);

      dreamTeam.splice(index, 1);

      this.setDreamTeam(dreamTeam);
      this.updateSyncDreamTeam();
    },

    async updateSyncDreamTeam () {
      if (!this.syncId) {
        return;
      }

      const method = this.isInDreamTeam ? SyncApi.patch : SyncApi.delete;

      try {
        await method(this.syncId, {
          dreamTeam: [this.villager.id],
        });

        this.$toasted.global.success({
          message: '<strong>NookSync:</strong>&nbsp;Dream Team updated.',
        });
      } catch (e) {
        PendingSync.setDreamTeamVillager(this.villager, this.isInDreamTeam);

        this.$toasted.global.error({
          message: '<strong>NookSync:</strong>&nbsp;Error updating Dream Team.',
        });
      }
    },

    onClose () {
      this.setDetailModalOpen(false);

      this.setSelectedVillager({});
    },
  },
};
</script>

<style lang="scss">
  .villager {
    display: flex;

    @include breakpoint(small) {
      margin: 0 -16px;
    }

    @include breakpoint(small, down) {
      flex-direction: column;
    }

    &__left,
    &__right {
      @include breakpoint(small) {
        flex: 0 0 50%;
        padding: 0 16px;
      }
    }

    &__left {
      text-align: center;

      @include breakpoint(small, down) {
        margin-bottom: 20px;
      }
    }

    &__image {
      margin-bottom: 10px;
      text-align: center;

      img {
        border: 5px solid white;
      }
    }

    &__quote {
      position: relative;
      margin: 16px 0 15px;
      line-height: 1.5;
      background: white;
      color: black;
      padding: 20px;
      border-radius: 10px;
      border: 1px dashed black;
      text-align: center;

      &::before,
      &::after {
        content: '"';
        position: relative;
      }
    }
  }
</style>
