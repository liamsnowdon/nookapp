<template>
  <div>
    <h1>NookApp</h1>
    <p>Welcome to the NookApp!</p>

    <div class="c-apps">
      <router-link
        class="c-apps__button"
        to="/critterpedia"
      >
        Critterpedia
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
};
</script>

<style>
  .c-apps {
    display: flex;
    flex-flow: row wrap;
  }
</style>
