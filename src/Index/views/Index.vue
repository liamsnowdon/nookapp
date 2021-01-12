<template>
  <div class="content">
    <div class="text-center">
      <h1>NookApp</h1>
      <p>
        Welcome to the NookApp, a hub of interactive apps to use alongside the Animal Crossing: New Horizons
        game on Nintendo Switch.
      </p>
    </div>

    <hr>

    <div class="links">
      <div class="links__column">
        <PageLink route="Fish">
          <template #image>
            <img :src="require(`Index/assets/critterpedia.png`)" alt="Critterpedia" />
          </template>

          <template #heading>
            Critterpedia
          </template>
        </PageLink>
      </div>

      <div class="links__column">
        <PageLink route="Fossils">
          <template #image>
            <img :src="require(`Index/assets/fossil.png`)" alt="Fossils" />
          </template>

          <template #heading>
            Fossils
          </template>
        </PageLink>
      </div>

      <div class="links__column">
        <PageLink route="Villagers">
          <template #image>
            <img :src="require(`Index/assets/villagers.png`)" alt="Villagers" />
          </template>

          <template #heading>
            Villagers
          </template>
        </PageLink>
      </div>

      <div class="links__column">
        <PageLink
          :is-icon="true"
          route="Checklist"
        >
          <template #image>
            <i class="fa fa-list" />
          </template>

          <template #heading>
            Checklist
          </template>
        </PageLink>
      </div>
    </div>
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
    max-width: 480px;
    padding: 20px;
    margin: 0 auto;
    color: white;
  }

  hr {
    margin: 30px 0;
  }

  .links {
    @include breakpoint(small) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 40px;
    }

    &__column {
      &:not(:last-child) {
        @include breakpoint(small, down) {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
