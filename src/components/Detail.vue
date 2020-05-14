<template>
  <div class="detail">
    <h2>Detail</h2>

    <template v-if="selectedCritter.name">
      <h3>{{ selectedCritter.name }}</h3>

      <img
        :src="`${publicPath}critters/${critterType}/${selectedCritter.image}`"
        :alt="selectedCritter.name"
      />

      <p>{{ selectedCritter.description }}</p>

      <h4>Locations</h4>
      <p>{{ selectedCritter.location }}</p>
    </template>

    <template v-else>
      Select a critter to learn more about it.
    </template>
  </div>
</template>

<script>
export default {
  name: 'Detail',

  props: {
    selectedCritter: {
      type: Object,
      required: true,
    },
    critterType: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

<style scoped lang="scss">
  .detail {
    flex: 0 0 50%;
  }

  img {
    max-width: 100%;
    height: auto;
  }
</style>
