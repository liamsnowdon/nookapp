<template>
  <div>
    <div class="l-content">
      <div class="l-content__title">
        <h1>NookSync</h1>
        <p>
          With the power of NookSync, you can sync up your data of donated critters and fossils to your other devices,
          so you know exactly what you're missing, wherever you are.
        </p>
      </div>

      <template v-if="syncId">
        <p>Your NookSync ID is: {{ syncId }}.</p>
        <p>Enter this ID on your other devices so they will stay in sync.</p>
      </template>

      <template v-else>
        <Button @click="createSession"
        >
          Create sync
        </Button>

        or

        <form @submit.prevent="setSessionFromSyncId">
          <input
            v-model="existingSyncId"
            type="text"
          />

          <Button type="submit">
            Save
          </Button>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { MODULE } from 'Core/constants/vuex';
import Button from 'Core/components/Button.vue';

export default {
  name: 'Sync',

  components: {
    Button,
  },

  data () {
    return {
      existingSyncId: null,
    };
  },

  computed: {
    ...mapState(MODULE, {
      syncId: state => state.syncId,
    }),
  },

  methods: {
    createSession () {

    },

    setSessionFromSyncId () {

    },
  },
};
</script>

<style lang="scss" scoped>

</style>
