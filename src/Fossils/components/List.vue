<template>
  <div class="list">
    <div class="list__column">
      <div class="list__section">
        <div class="list__section-header">
          <h2 class="mb-0">Multipart Fossils</h2>
        </div>

        <template v-if="loading">
          <div class="list__empty">
            <Spinner />
          </div>
        </template>

        <template v-else-if="!loading && errorLoadingFossils">
          <div class="list__empty">
            {{ errorMessage }}
          </div>
        </template>

        <template v-else>
          <div class="list__section-items">
            <ListDropdown
              v-for="group in groupedFossils"
              :key="group.groupName"
              :group="group"
            />
          </div>
        </template>
      </div>
    </div>

    <div class="list__column">
      <div class="list__section">
        <div class="list__section-header">
          <h2 class="mb-0">Standalone Fossils</h2>
        </div>

        <template v-if="loading">
          <div class="list__empty">
            <Spinner />
          </div>
        </template>

        <template v-else-if="!loading && errorLoadingFossils">
          <div class="list__empty">
            {{ errorMessage }}
          </div>
        </template>

        <template v-else>
          <div class="list__section-items">
            <ListItem
              v-for="fossil in standaloneFossils"
              :key="fossil['file-name']"
              :fossil="fossil"
              @click="selectFossil"
            >
              {{ fossil.name['name-EUen'] }}
            </ListItem>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy';
import { mapState } from 'vuex';
import { MODULE } from 'Fossils/constants/vuex';
import { MESSAGES } from 'Fossils/constants/messages';
import ListDropdown from 'Fossils/components/ListDropdown.vue';
import ListItem from 'Fossils/components/ListItem.vue';
import Spinner from 'Core/components/Spinner.vue';

export default {
  name: 'List',

  components: {
    ListDropdown,
    ListItem,
    Spinner,
  },

  computed: {
    ...mapState(MODULE, {
      loading: state => state.loading,
      errorLoadingFossils: state => state.errorLoadingFossils,
      fossils: state => state.fossils,
    }),

    errorMessage () {
      return MESSAGES.API_ERROR;
    },

    fossilGroups () {
      const groups = groupBy(this.fossils, 'part-of');

      return Object.keys(groups).map(group => {
        return {
          groupName: group,
          parts: groups[group],
        };
      });
    },

    standaloneFossils () {
      const standaloneFossilGroup = this.fossilGroups.find(group => !group.groupName);

      return standaloneFossilGroup ? standaloneFossilGroup.parts : [];
    },

    groupedFossils () {
      const standaloneFossilsIndex = this.fossilGroups.findIndex(group => !group.groupName);
      const fossils = this.fossilGroups.slice();

      fossils.splice(standaloneFossilsIndex, 1);

      return fossils;
    },
  },

  methods: {
    selectFossil (fossil) {
      console.log(fossil);
    },
  },
};
</script>

<style lang="scss">
  @import '@/Core/scss/_abstracts.scss';

  .list {
    @include breakpoint(medium) {
      display: grid;
      grid-gap: 30px;
      grid-template-columns: 1fr 1fr;
    }

    &__empty {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    &__column {
      @include breakpoint(medium, down) {
        &:not(:last-child) {
          margin-bottom: 30px;
        }
      }
    }

    &__section {
      background-color: #1b1b2f;
      border: 1px solid black;

      &:not(:last-child) {
        margin-bottom: 50px;
      }
    }

    &__section-header {
      padding: 20px;
      color: white;
    }
  }
</style>
