<template>
  <nav class="navigation">
    <div class="navigation__content">
      <ul class="navigation__list">
        <li class="navigation__list-item">
          <router-link
            class="navigation__link navigation__link--fish"
            :to="{ name: 'Fish' }"
          />
        </li>
        <li class="navigation__list-item">
          <router-link
            class="navigation__link navigation__link--bugs"
            :to="{ name: 'Bugs' }"
          />
        </li>
        <li class="navigation__list-item">
          <router-link
            class="navigation__link navigation__link--sea-creatures"
            :to="{ name: 'Sea Creatures' }"
          />
        </li>
      </ul>
      <div class="navigation__buttons">
        <button class="navigation__button" @click="openQuickAddModal">
          Quick Add
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { MODULE, MUTATIONS } from 'Critterpedia/constants/vuex';

const { mapMutations } = createNamespacedHelpers(MODULE);

export default {
  name: 'Navigation',

  methods: {
    ...mapMutations([
      MUTATIONS.SET_SETTINGS_MODAL_OPEN,
      MUTATIONS.SET_QUICK_ADD_MODAL_OPEN,
    ]),

    openQuickAddModal () {
      this.setQuickAddModalOpen(true);
    },
  },
};
</script>

<style lang="scss" scoped>
  .navigation {
    background-color: white;

    @include breakpoint(medium) {
      padding-top: 30px;
    }

    &__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: var(--global-width);
      margin: 0 auto;
    }

    &__list {
      display: flex;
      padding: 0;
      margin: 0;
      list-style: none;

      @include breakpoint(medium, down) {
        flex: 0 0 100%;
      }
    }

    &__buttons {
      display: flex;
      align-items: center;

      @include breakpoint(medium, down) {
        display: none;
      }
    }

    &__button {
      @extend %button-reset;
      margin: 0 10px;
      font-weight: 600;

      &:not(:hover) {
        opacity: 0.7;
      }

      img {
        height: 40px;
      }
    }

    &__list-item {
      width: 50%;
      height: 50px;

      @include breakpoint(medium) {
        width: 200px;
        border-radius: 20px 20px 0 0;
        margin-right: 20px;
      }

      @include breakpoint(medium, down) {
        border-bottom: 1px solid var(--brown-border);
        border-top: 1px solid var(--brown-border);
      }
    }

    &__link {
      display: block;
      height: 100%;
      width: 100%;
      font-weight: bold;
      background: center no-repeat var(--brown-dark);

      @include breakpoint(medium) {
        border-radius: 20px 20px 0 0;
      }

      &.is-active {
        background-color: var(--brown-medium);
      }

      &--fish {
        background-image: url(~Critterpedia/assets/critterpedia-fish.png);
        background-size: 65px;
      }

      &--bugs {
        background-image: url(~Critterpedia/assets/critterpedia-bugs.png);
        background-size: 45px;
      }

      &--sea-creatures {
        background-image: url(~Critterpedia/assets/critterpedia-sea-creatures.png);
        background-size: 60px;
      }
    }
  }
</style>
