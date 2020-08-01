<template>
  <div class="list-dropdown">
    <button
      class="list-dropdown__button"
      @click="isOpen = !isOpen"
    >
      <div class="list-dropdown__button-inner">
        <div class="list-dropdown__text">
          {{ group.groupName }} <strong v-if="allPartsDonated">- Complete</strong>
        </div>

        <div class="list-dropdown__actions">
          <i
            class="fa"
            :class="isOpen ? 'fa-chevron-up' : 'fa-chevron-down'"
          />
        </div>
      </div>
    </button>

    <div
      v-if="isOpen"
      class="list-dropdown__items"
    >
      <ListItem
        v-for="part in group.parts"
        :key="part['file-name']"
        :fossil="part"
        @click="selectFossil"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GETTERS, MODULE } from 'Fossils/constants/vuex';
import ListItem from 'Fossils/components/ListItem.vue';

export default {
  name: 'ListDropdown',

  props: {
    group: {
      type: Object,
      required: true,
    },
  },

  components: {
    ListItem,
  },

  data () {
    return {
      isOpen: false,
    };
  },

  computed: {
    ...mapGetters(MODULE, [
      GETTERS.GET_DONATED_FOSSIL,
    ]),

    allPartsDonated () {
      return !this.group.parts.find(part => !this.getDonatedFossil(part['file-name']));
    },
  },

  methods: {
    selectFossil (fossil) {
      console.log(fossil);
    },
  },
};
</script>

<style lang="scss" scoped>
  .list-dropdown {
    &__button {
      @extend %button-reset;
      width: 100%;
      padding: 0 20px;
      height: 50px;
      border-top: 2px solid black;
      color: white;
      text-align: left;
      text-transform: capitalize;
    }

    &__button-inner {
      display: flex;
      justify-content: space-between;
    }

    &__items {
      .list-item {
        padding-left: 60px;
      }
    }

    &__text {
      line-height: 50px;
    }

    &__actions {
      > .fa {
        font-size: 28px;
        line-height: 50px;
      }
    }
  }
</style>
