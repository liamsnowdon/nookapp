<template>
  <router-link
    class="link"
    :to="{ name: route }"
  >
    <div
      :class="{'link__image--icon': isIcon}"
      class="link__image"
    >
      <slot name="image" />
    </div>

    <div class="link__text">
      <h3 class="link__heading">
        <slot name="heading" />
      </h3>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'PageLink',

  props: {
    route: {
      type: String,
      required: true,
    },

    isIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  .link {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #121212;
    background-color: #191919;
    text-decoration: none;
    text-align: center;
    color: white;
    border-radius: 20px;

    @include breakpoint(small) {
      flex-direction: column;
      height: 200px;
      width: 200px;
      padding: 20px;
    }

    @include breakpoint(small, down) {
      height: 100px;
    }

    &:hover {
      background-color: #131212;
    }

    &__image {
      @include breakpoint(small) {
        height: 110px;
      }

      @include breakpoint(small, down) {
        margin-right: 20px;
        width: 70px;
      }

      &--icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;

        @include breakpoint(small) {
          font-size: 80px;
        }
      }
    }

    &__heading {
      margin: 0;
    }

    &__text {
      @include breakpoint(small) {
        margin-top: auto;
      }
    }
  }
</style>
