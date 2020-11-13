<template>
  <Modal
    ref="modal"
    :is-open="isOpen"
    size="small"
    @close="onClose"
  >
    <template #title>
      {{ villager.name['name-EUen'] | capitalize }}
    </template>

    <template #content>
      <div class="villager">
        <div class="villager__image">
          <img
            :src="`https://acnhapi.com/v1/images/villagers/${villager.id}`"
            :alt="villager.name['name-EUen']"
          />
        </div>

        <div class="villager__info">
          <h3>{{ villager.name['name-EUen'] | capitalize }}</h3>

          <p>Species: {{ villager.species }}</p>
          <p>Personality: {{ villager.personality }}</p>
          <p>Gender: {{ villager.gender }}</p>

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
      dreamTeamVillagers: state => state.dreamTeamVillagers,
    }),

    ...mapGetters(MODULE, [
      GETTERS.CAN_HAVE_MORE_DREAM_TEAM_VILLAGERS,
    ]),

    villager () {
      return this.selectedVillager;
    },

    isInDreamTeam () {
      return this.dreamTeamVillagers.includes(this.villager.id);
    },
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_DETAIL_MODAL_OPEN,
      MUTATIONS.SET_SELECTED_VILLAGER,
      MUTATIONS.SET_DREAM_TEAM_VILLAGERS,
    ]),

    addToDreamTeam () {
      const dreamTeam = this.dreamTeamVillagers.slice();

      dreamTeam.push(this.villager.id);

      this.setDreamTeamVillagers(dreamTeam);
    },

    removeFromDreamTeam () {
      const dreamTeam = this.dreamTeamVillagers.slice();
      const index = dreamTeam.findIndex(villager => villager.id === this.villager.id);

      dreamTeam.splice(index, 1);

      this.setDreamTeamVillagers(dreamTeam);
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
    &__image {
      margin-bottom: 10px;
      text-align: center;

      img {
        border: 5px solid white;
      }
    }

    &__info {
      text-align: center;
    }

    &__button {

    }
  }
</style>
