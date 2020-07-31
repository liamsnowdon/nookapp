<template>
  <nav>
    <ul class="">
      <li class="">
        <router-link
          class=""
          :to="{ name: 'Home' }"
        >
          Home
        </router-link>
      </li>
      <li class="">
        <router-link
          class=""
          :to="{ name: 'Fish' }"
        >
          Critterpedia
        </router-link>
      </li>

      <li class="">
        <router-link
          class=""
          :to="{ name: 'Fossils' }"
        >
          Fossils
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>

<style scoped>

</style>
