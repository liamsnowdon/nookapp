<template>
  <router-link
    class="link"
    :to="{ name: route }"
  >
    <div class="link__image">
      <slot name="image" />
    </div>

    <div class="link__text">
      <h3 class="link__heading">
        <slot name="heading" />
      </h3>
      <p class="link__description">
        <slot name="description" />
      </p>
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
  },
};
</script>

<style lang="scss" scoped>
  .link {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #121212;
    background-color: #191919;
    text-decoration: none;
    color: white;

    &:hover {
      background-color: #131212;
    }

    &__image {
      flex: 0 0 100px;
      margin-right: 20px;
    }

    &__text {
      flex: 1 0 0;
    }
  }
</style>
