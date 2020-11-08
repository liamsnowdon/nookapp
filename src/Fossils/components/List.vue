<template>
  <div class="list">
    <div class="list__column">
      <div
        class="list__section"
        :class="{ 'is-mobile-collapsed': !multipartMobileIsOpen }"
      >
        <div class="list__section-header">
          <h2 class="list__section-header-desktop">Multipart Fossils</h2>

          <button
            class="list__section-toggle"
            @click="multipartMobileIsOpen = !multipartMobileIsOpen"
          >
            <div class="list__section-toggle-inner">
              Multipart Fossils

              <i
                class="fa"
                :class="multipartMobileIsOpen ? 'fa-chevron-up' : 'fa-chevron-down'"
              />
            </div>
          </button>
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
              v-for="group in multipartFossils"
              :key="group.groupName"
              :group="group"
            />
          </div>
        </template>
      </div>
    </div>

    <div class="list__column">
      <div
        class="list__section"
        :class="{ 'is-mobile-collapsed': !standaloneMobileIsOpen }"
      >
        <div class="list__section-header">
          <h2 class="list__section-header-desktop">Standalone Fossils</h2>

          <button
            class="list__section-toggle"
            @click="standaloneMobileIsOpen = !standaloneMobileIsOpen"
          >
            <div class="list__section-toggle-inner">
              Standalone Fossils

              <i
                class="fa"
                :class="standaloneMobileIsOpen ? 'fa-chevron-up' : 'fa-chevron-down'"
              />
            </div>
          </button>
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

  data () {
    return {
      multipartMobileIsOpen: true,
      standaloneMobileIsOpen: true,
    };
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

    /**
     * Groups all the fossils from the API into groups of related parts
     *
     * @returns {Array}
     */
    fossilGroups () {
      const groups = groupBy(this.fossils, 'part-of');

      return Object.keys(groups).map(group => {
        return {
          groupName: group,
          parts: groups[group],
        };
      });
    },

    /**
     * Fossils that are not part of a group (e.g. Amber)
     *
     * @returns {Array}
     */
    standaloneFossils () {
      const fossils = this.fossilGroups.filter(group => group.parts.length === 1);

      return fossils.map(fossil => fossil.parts[0]);
    },

    /**
     * Fossils that are part of a group (e.g. T.Rex has T.Rex tail, T.Rex torso)
     *
     * @returns {Array}
     */
    multipartFossils () {
      return this.fossilGroups.filter(group => group.parts.length > 1);
    },
  },
};
</script>

<style lang="scss">
  .list {
    $block: &;

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

      &.is-mobile-collapsed {
        @include breakpoint(medium, down) {
          #{$block}__section-items {
            display: none;
          }
        }
      }
    }

    &__section-header {
      @include breakpoint(medium) {
        padding: 20px;
      }

      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
    }

    &__section-header-desktop {
      margin-bottom: 0;

      @include breakpoint(medium, down) {
        display: none;
      }
    }

    &__section-toggle {
      @include breakpoint(medium) {
        display: none;
      }

      @extend %button-reset;
      padding: 16px;
      width: 100%;
      color: white;
      font-size: 28px;

      .fa {
        font-size: 40px;
        line-height: 50px;
      }
    }

    &__section-toggle-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
