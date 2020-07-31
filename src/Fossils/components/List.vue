<template>
  <div class="list">
    <div class="list__column">
      <div class="list__section">
        <div class="list__section-header">
          <h3 class="mb-0">Multipart Fossils</h3>
        </div>

        <div class="list__section-items">
          <ListDropdown
            v-for="group in groupedFossils"
            :key="group.groupName"
            :group="group"
          />
        </div>
      </div>
    </div>

    <div class="list__column">
      <div class="list__section">
        <div class="list__section-header">
          <h3 class="mb-0">Standalone Fossils</h3>
        </div>

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
      </div>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy';
import { mapState } from 'vuex';
import { MODULE } from 'Fossils/constants/vuex';
import ListDropdown from 'Fossils/components/ListDropdown.vue';
import ListItem from 'Fossils/components/ListItem';

export default {
  name: 'List',

  components: {
    ListDropdown,
    ListItem,
  },

  computed: {
    ...mapState(MODULE, {
      fossils: state => state.fossils,
    }),

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
    display: flex;
    flex-flow: row wrap;

    @include breakpoint(medium) {
      margin: 0 -30px;
    }

    &__column {
      flex: 0 0 50%;

      @include breakpoint(medium) {
        padding: 0 30px;
      }

      @include breakpoint(medium, down) {
        flex: 0 0 100%;

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
