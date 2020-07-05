<template>
  <div class="l-wrapper">
    <div class="l-content">
      <div class="l-content__title">
        <h1>NookApp</h1>
        <p>Welcome to the NookApp!</p>
      </div>

      <div class="c-apps">
        <div class="c-apps__column">
          <AppButton
            class="is-critterpedia"
            path="/critterpedia"
            image="critterpedia.png"
            name="Critterpedia"
          />
        </div>

        <div class="c-apps__column">
          <AppButton
            class="is-fossils"
            path="/fossils"
            image="fossil.png"
            name="Fossils"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../components/Button.vue';

export default {
  name: 'Index',

  components: {
    AppButton: Button,
  },
};
</script>

<style lang="scss">
  @import '@/Core/scss/_abstracts.scss';
  @import '@/Index/scss/_variables.scss';

  body {
    background-color: $body-background;
  }

  .l-wrapper {
    padding: 40px 20px;
  }

  .l-content {
    max-width: $global-width;
    margin: 0 auto;

    &__title {
      margin-bottom: 30px;
      text-align: center;

      h1 {
        margin: 0;

        + p {
          margin-top: 10px;
          margin-bottom: 0;
        }
      }
    }
  }

  .c-apps {
    display: flex;
    flex-flow: row wrap;
    margin: 0 -20px;

    &__column {
      flex: 1 0 0;
      padding: 0 20px;
    }

    &__button {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      border-radius: 20px;
      text-align: center;
      text-decoration: none;

      &.is-critterpedia {
        background-color: $button-critterpedia;
      }

      &.is-fossils {
        background-color: $button-fossils;
      }
    }

    &__button-image {
      flex: 1 0 0;

      img {
        // not great, need new images anyway.
        height: 100%;
      }
    }

    &__button-name {
      color: black;
    }
  }
</style>
