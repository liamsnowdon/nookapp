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
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>

<style lang="scss">
  .navigation {

    &__list {
      display: flex;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__list-item {
      width: 200px;
      height: 50px;
      border-radius: 20px 20px 0 0;
      margin-right: 20px;
    }

    &__link {
      display: block;
      height: 100%;
      width: 100%;
      font-weight: bold;
      color: #2c3e50;
      background: center no-repeat #d8cfa6;
      border-radius: 20px 20px 0 0;

      &.is-active {
        background-color: #F0E6B8;
      }

      &--fish {
        background-image: url(~@/assets/critterpedia-fish.png);
        background-size: 65px;
      }

      &--bugs {
        background-image: url(~@/assets/critterpedia-bugs.png);
        background-size: 45px;
      }
    }
  }
</style>
