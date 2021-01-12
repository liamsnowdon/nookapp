<template>
  <div class="dream-team">
    <h3>Your dream team</h3>

    <div
      v-if="loading"
      class="dream-team__loading"
    >
      <Spinner />
    </div>

    <div
      v-else-if="villagers.length"
      class="dream-team__villagers"
    >
      <button
        v-for="villager in villagers"
        :key="villager.id"
        @click="openDetailModal(villager)"
        class="dream-team__villager"
      >
      <span
        :style="{backgroundImage: `url(https://acnhapi.com/v1/icons/villagers/${villager.id}`}"
        class="dream-team__image"
      />
        {{ villager.name['name-EUen'] }}
      </button>
    </div>

    <p v-else>
      Your dream team is empty! Add villagers to it by clicking on them below to open their detailed view.
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { MODULE, MUTATIONS } from 'Villagers/constants/vuex';

import Spinner from 'Core/components/Spinner.vue';

export default {
  name: 'DreamTeam',

  components: {
    Spinner,
  },

  computed: {
    ...mapState(MODULE, {
      loading: state => state.loading,
      villagersPool: state => state.villagers,
      dreamTeam: state => state.dreamTeam,
    }),

    villagers () {
      return this.dreamTeam.map(villagerId => this.villagersPool.find(villager => villager.id === villagerId));
    },
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_SELECTED_VILLAGER,
      MUTATIONS.SET_DETAIL_MODAL_OPEN,
    ]),

    openDetailModal (villager) {
      this.setSelectedVillager(villager);

      this.setDetailModalOpen(true);
    },
  },
};
</script>

<style lang="scss" scoped>
  .dream-team {
    padding: 20px;
    border: 10px dashed white;

    @include breakpoint(medium, down) {
      margin-bottom: 20px;
      text-align: center;
    }

    &__loading {
      text-align: center;
    }

    &__villagers {
      display: flex;
      flex-flow: column wrap;
      height: 130px;
      overflow-x: auto;
    }

    &__villager {
      @extend %button-reset;
      margin: 0 20px 0 0;

      @include breakpoint(medium) {
        margin: 0 20px 20px 0;
      }
    }

    &__image {
      display: block;
      height: 80px;
      width: 80px;
      margin: 0 auto 10px;
      background: center / contain no-repeat white;
      border-radius: 50%;
    }
  }
</style>
