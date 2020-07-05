<template>
  <router-link
    class="c-apps__button"
    :to="path"
  >
    <div class="c-apps__button-image">
      <img :src="require(`../assets/${image}`)" :alt="name" />
    </div>
    <h3 class="c-apps__button-name">
      {{ name }}
    </h3>
  </router-link>
</template>

<script>
export default {
  name: 'Button',

  props: {
    path: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
