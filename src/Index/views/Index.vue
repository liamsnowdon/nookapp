<template>
  <div class="content">
    <div class="text-center">
      <h1>NookApp</h1>
      <p>Welcome to the NookApp!</p>
    </div>

    <hr>

    <PageLink route="Fish">
      <template #image>
        <img :src="require(`Index/assets/critterpedia.png`)" alt="Critterpedia" />
      </template>

      <template #heading>
        Critterpedia
      </template>

      <template #description>
        Everything about the critters you can find on and around your island, including fish, bugs and sea creatures.
      </template>
    </PageLink>

    <PageLink route="Fossils">
      <template #image>
        <img :src="require(`Index/assets/fossil.png`)" alt="Fossils" />
      </template>

      <template #heading>
        Fossils
      </template>

      <template #description>
        There are many fossils you can find on your island. Complete each set and fill up your museum.
      </template>
    </PageLink>

    <PageLink route="Villagers">
      <template #image>
        <img :src="require(`Index/assets/villagers.png`)" alt="Villagers" />
      </template>

      <template #heading>
        Villagers
      </template>

      <template #description>
        Look through the hundreds of villagers and create your dream team for your island!
      </template>
    </PageLink>

    <PageLink
      :is-icon="true"
      route="Checklist"
    >
      <template #image>
        <i class="fa fa-list" />
      </template>

      <template #heading>
        Daily Checklist
      </template>

      <template #description>
        Make sure you do everything you need to do by keeping track with your daily checklist.
      </template>
    </PageLink>
  </div>
</template>

<script>
import PageLink from 'Index/components/PageLink.vue';

export default {
  name: 'Index',

  components: {
    PageLink,
  },

  mounted () {
    document.querySelector('body').classList.add('page-index');
  },

  destroyed () {
    document.querySelector('body').classList.remove('page-index');
  },
};
</script>

<style lang="scss" scoped>
  .content {
    max-width: 650px;
    margin: 0 auto;
    color: white;
  }

  hr {
    margin: 30px 0;
  }
</style>
