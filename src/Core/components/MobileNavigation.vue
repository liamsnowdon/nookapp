<template>
  <div>
    <div
      class="mobile-navigation-overlay"
      :class="{ 'is-active': isOpen }"
    />
    <div
      class="mobile-navigation"
      :class="{ 'is-open': isOpen }"
    >
      <div class="mobile-navigation__header">
        <h2>Pages</h2>
        <button class="cross" @click="close"></button>
      </div>

      <div class="mobile-navigation__content">
        <ul class="mobile-navigation__items">
          <li class="mobile-navigation__item">
            <router-link
              class="mobile-navigation__link"
              :to="{ name: 'Fish' }"
            >
              Critterpedia
            </router-link>
          </li>

          <li class="mobile-navigation__item">
            <router-link
              class="mobile-navigation__link"
              :to="{ name: 'Fossils' }"
            >
              Fossils
            </router-link>
          </li>

          <li class="mobile-navigation__item">
            <router-link
              class="mobile-navigation__link"
              :to="{ name: 'Villagers' }"
            >
              Villagers
            </router-link>
          </li>

          <li class="mobile-navigation__item">
            <router-link
              class="mobile-navigation__link"
              :to="{ name: 'Checklist' }"
            >
              Daily Checklist
            </router-link>
          </li>
        </ul>

        <hr class="mobile-navigation__separator">

        <ul class="mobile-navigation__items">
          <li class="mobile-navigation__item">
            <router-link
              class="mobile-navigation__link"
              :to="{ name: 'Sync' }"
            >
              NookSync
            </router-link>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileNavigation',

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    close () {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
  .mobile-navigation-overlay {
    @include breakpoint(medium) {
      display: none;
    }

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    @include z-index(sliderOverlay);
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    visibility: hidden;
    transition: opacity .5s ease-in-out, visibility .5s ease-in-out;

    &.is-active {
      opacity: 1;
      visibility: visible;
    }
  }

  .mobile-navigation {
    @include breakpoint(medium) {
      display: none;
    }

    position: fixed;
    left: -100%;
    top: 0;
    height: 100%;
    width: calc(100% - 60px);
    background-color: var(--navigation-background-color);
    transition: left 0.5s ease-in-out;
    @include z-index(slider);

    &.is-open {
      left: 0;
    }

    &__content {
      padding: 20px;
    }

    &__header {
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      color: var(--navigation-text-color);

      h2 {
        margin: 0;
      }
    }

    &__items {
      @extend %list-reset;
    }

    &__link {
      display: block;
      padding: 10px 0;
      color: var(--navigation-text-color);
      text-decoration: none;
      font-size: 20px;
    }

    &__separator {
      margin: 25px 0;
    }
  }
</style>
