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
    </ul>

    <ul class="navigation__items navigation__items--right">
      <li class="navigation__item">
        <button class="navigation__button" @click="openSettingsModal">
          <img :src="require('Core/assets/cog.svg')" alt="Settings" />
        </button>
      </li>
    </ul>

    <SettingsModal />
  </nav>
</template>

<script>
import { mapMutations } from 'vuex';
import { MODULE, MUTATIONS } from 'Core/constants/vuex';
import SettingsModal from 'Core/components/SettingsModal.vue';

export default {
  name: 'Navigation',

  components: {
    SettingsModal,
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_SETTINGS_MODAL_OPEN,
    ]),

    openSettingsModal () {
      this.setSettingsModalOpen(true);
    },
  },
};
</script>

<style lang="scss" scoped>
  .navigation {
    display: flex;
    align-items: center;
    padding: 20px;

    &__home {
      padding-right: 20px;
      border-right: 2px solid white;
      margin-right: 20px;
    }

    &__home-link {
      display: block;
      font-size: 22px;
      color: white;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    &__items {
      display: flex;
      @extend %list-reset;

      &--left {

      }

      &--right {
        margin-left: auto;
      }
    }

    &__item {
      display: flex;
      align-items: center;
    }

    &__link {
      display: block;
      padding: 10px;
      color: white;
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

      img {
        height: 40px;
      }
    }
  }
</style>
