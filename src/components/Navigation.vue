<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__list-item">
        <router-link
          class="navigation__link navigation__link--fish"
          to="/fish"
        />
      </li>
      <li class="navigation__list-item">
        <router-link
          class="navigation__link navigation__link--bugs"
          to="/bugs"
        />
      </li>
      <li class="navigation__list-item">
        <router-link
          class="navigation__link navigation__link--sea-creatures"
          to="/sea-creatures"
        />
      </li>
    </ul>
    <div class="navigation__buttons">
      <button class="navigation__button" @click="openSettingsModal">
        <img src="../assets/cog.svg" alt="Settings" />
      </button>
    </div>
  </nav>
</template>

<script>
import { VUEX_MUTATIONS } from '../constants';

export default {
  name: 'Navigation',

  methods: {
    openSettingsModal () {
      this.$store.commit(VUEX_MUTATIONS.SET_SETTINGS_MODAL_OPEN, true);
    },
  },
};
</script>

<style lang="scss">
  @import '@/scss/_abstracts.scss';

  .navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: $global-width;
    margin: 0 auto;

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
      @include breakpoint(medium, down) {
        display: none;
      }
    }

    &__button {
      @extend %button-reset;
      margin: 0 10px;

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
        border-bottom: 1px solid $brown-border;
      }
    }

    &__link {
      display: block;
      height: 100%;
      width: 100%;
      font-weight: bold;
      background: center no-repeat $brown-dark;

      @include breakpoint(medium) {
        border-radius: 20px 20px 0 0;
      }

      &.is-active {
        background-color: $brown-medium;
      }

      &--fish {
        background-image: url(~@/assets/critterpedia-fish.png);
        background-size: 65px;
      }

      &--bugs {
        background-image: url(~@/assets/critterpedia-bugs.png);
        background-size: 45px;
      }

      &--sea-creatures {
        background-image: url(~@/assets/critterpedia-sea-creatures.png);
        background-size: 60px;
      }
    }
  }
</style>
