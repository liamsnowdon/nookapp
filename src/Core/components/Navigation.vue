<template>
  <nav class="navigation">
    <div class="navigation__home">
      <router-link
        class="navigation__home-link"
        :to="{ name: 'Home' }"
      >
        NookApp
      </router-link>
    </div>

    <ul class="navigation__items navigation__items--left">
      <li class="navigation__item">
        <router-link
          class="navigation__link"
          :to="{ name: 'Fish' }"
        >
          Critterpedia
        </router-link>
      </li>

      <li class="navigation__item">
        <router-link
          class="navigation__link"
          :to="{ name: 'Fossils' }"
        >
          Fossils
        </router-link>
      </li>

      <li class="navigation__item">
        <router-link
          class="navigation__link"
          :to="{ name: 'Sync' }"
        >
          NookSync
        </router-link>
      </li>

      <li class="navigation__item">
        <router-link
          class="navigation__link"
          :to="{ name: 'Checklist' }"
        >
          Daily Checklist
        </router-link>
      </li>
    </ul>

    <ul class="navigation__items navigation__items--right">
      <li class="navigation__item">
        <button class="navigation__button" @click="openSettingsModal">
          <i class="fa fa-cog" />
        </button>
      </li>

      <li class="navigation__item navigation__item--mobile">
        <button class="navigation__button" @click="toggleMobileNav">
          <i class="fa fa-bars" />
        </button>
      </li>
    </ul>

    <SettingsModal />
    <MobileNavigation
      :is-open="mobileNavOpen"
      @close="mobileNavOpen = false"
    />
  </nav>
</template>

<script>
import { mapMutations } from 'vuex';
import { MODULE, MUTATIONS } from 'Core/constants/vuex';
import SettingsModal from 'Core/components/SettingsModal.vue';
import MobileNavigation from 'Core/components/MobileNavigation.vue';

export default {
  name: 'Navigation',

  data () {
    return {
      mobileNavOpen: false,
    };
  },

  components: {
    SettingsModal,
    MobileNavigation,
  },

  watch: {
    $route () {
      this.mobileNavOpen = false;
      window.scrollTo(0, 0);
    },
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_SETTINGS_MODAL_OPEN,
    ]),

    openSettingsModal () {
      this.setSettingsModalOpen(true);
    },

    toggleMobileNav () {
      this.mobileNavOpen = !this.mobileNavOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
  .navigation {
    $block: &;

    display: flex;
    align-items: center;
    padding: 20px;
    background-color: var(--navigation-background-color);

    &__home {
      padding-right: 20px;
      border-right: 2px solid var(--navigation-text-color);
      margin-right: 20px;
    }

    &__home-link {
      display: block;
      font-size: 22px;
      color: var(--navigation-text-color);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    &__items {
      display: flex;
      @extend %list-reset;

      &--left {
        @include breakpoint(medium, down) {
          display: none;
        }
      }

      &--right {
        margin-left: auto;

        #{$block}__item {
          margin-left: 20px;
        }
      }
    }

    &__item {
      display: flex;
      align-items: center;

      &--mobile {
        @include breakpoint(medium) {
          display: none;
        }
      }
    }

    &__link {
      display: block;
      padding: 10px;
      color: var(--navigation-text-color);
      height: 100%;
      line-height: 33px;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    &__button {
      @extend %button-reset;

      &:not(:hover) {
        opacity: 0.7;
      }

      .fa {
        font-size: 40px;
        color: var(--navigation-text-color);
      }
    }
  }
</style>
