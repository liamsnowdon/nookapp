<template>
  <Modal
    ref="modal"
    :is-open="isOpen"
    @close="onClose"
  >
    <template #title>
      Quick Add
    </template>

    <template #content>
      <p class="text-center">
        Use the text box below to "Quick Add" a critter and mark it as donated.
      </p>

      <div
        class="autocomplete"
        :class="{'is-active': resultsOpen}"
        v-on-clickaway="closeResults"
      >
        <input
          v-model="quickAdd"
          type="text"
          class="autocomplete__input"
          placeholder="Common Butterfly"
          @focus="openResults"
        />
        <div
          v-show="quickAdd.length >= AUTOCOMPLETE_MINIMUM_CHARS"
          class="autocomplete__results"
        >
          <div
            v-for="group in autocompleteResults"
            :key="group.groupName"
            v-show="group.groupOptions.length > 0"
            class="autocomplete__group"
          >
            <span class="autocomplete__group-name">{{ group.groupName }}</span>
            <div class="autocomplete__options">
              <button
                v-for="option in group.groupOptions"
                :key="option.id"
                class="autocomplete__option"
                @click="add(option, group.critterType)"
              >
                <img
                  :src="option.icon_uri"
                  :alt="option.name['name-EUen']"
                  class="autocomplete__icon"
                />
                {{ option.name['name-EUen'] }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="critters-list">
        <div
          v-for="(critter, index) in quickAddedCritters"
          :key="critter.critter.id"
          class="critter"
        >
          <div
            class="critter__image"
            :style="{backgroundImage: `url(${critter.critter.image_uri})`}"
          />
          <span class="critter__name">
            {{ critter.critter.name['name-EUen'] }}
          </span>

          <Button
            class="critter__action"
            @click="undo(critter.critter, critter.critterType, index)"
          >
            Undo
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import { mixin as clickaway } from 'vue-clickaway';
import Modal from 'Core/components/Modal';
import Button from 'Core/components/Button';
import { MODULE, MUTATIONS, ACTIONS } from 'Critterpedia/constants/vuex';
import { CRITTER_TYPES } from 'Critterpedia/constants/critter-types';

const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers(MODULE);

export default {
  name: 'QuickAddModal',

  mixins: [
    clickaway,
  ],

  components: {
    Modal,
    Button,
  },

  data () {
    return {
      resultsOpen: false,
      quickAdd: '',
      quickAddedCritters: [],
    };
  },

  created () {
    this.AUTOCOMPLETE_MINIMUM_CHARS = 3;
  },

  computed: {
    ...mapState({
      isOpen: state => state.quickAddModalOpen,
      bugs: state => state.bugs,
      fish: state => state.fish,
      seaCreatures: state => state.seaCreatures,
    }),

    ...mapGetters({
      getDonatedCritter: 'getDonatedCritter',
    }),

    autocompleteGroups () {
      return [
        {
          groupName: 'Bugs',
          critterType: CRITTER_TYPES.BUGS,
          groupOptions: this.bugs.filter(bug => {
            return !this.getDonatedCritter({ id: bug.id, critterType: CRITTER_TYPES.BUGS });
          }),
        },
        {
          groupName: 'Fish',
          critterType: CRITTER_TYPES.FISH,
          groupOptions: this.fish.filter(fish => {
            return !this.getDonatedCritter({ id: fish.id, critterType: CRITTER_TYPES.FISH });
          }),
        },
        {
          groupName: 'Sea Creatures',
          critterType: CRITTER_TYPES.SEA_CREATURES,
          groupOptions: this.seaCreatures.filter(seaCreature => {
            return !this.getDonatedCritter({ id: seaCreature.id, critterType: CRITTER_TYPES.SEA_CREATURES });
          }),
        },
      ];
    },

    autocompleteResults () {
      return this.autocompleteGroups.map(group => {
        return {
          groupName: group.groupName,
          critterType: group.critterType,
          groupOptions: this.quickAdd.length >= this.AUTOCOMPLETE_MINIMUM_CHARS
            ? group.groupOptions.filter(option => option.name['name-EUen'].toLowerCase().includes(this.quickAdd.toLowerCase()))
            : [],
        };
      });
    },
  },

  watch: {
    isOpen (newValue) {
      if (!newValue) {
        this.quickAdd = '';
        this.quickAddedCritters = [];
        return;
      }

      this.getBugs();
      this.getFish();
      this.getSeaCreatures();
    },
  },

  methods: {
    ...mapMutations([
      MUTATIONS.SET_QUICK_ADD_MODAL_OPEN,
      MUTATIONS.SET_DONATED_CRITTER_STATUS,
    ]),

    ...mapActions([
      ACTIONS.CATCH_FISH,
      ACTIONS.CATCH_BUGS,
      ACTIONS.CATCH_SEA_CREATURES,
    ]),

    openResults () {
      this.resultsOpen = true;
    },

    closeResults () {
      this.resultsOpen = false;
    },

    onClose () {
      this.setQuickAddModalOpen(false);
    },

    getBugs () {
      if (this.bugs.length) {
        return;
      }

      this.catchBugs();
    },

    getFish () {
      if (this.fish.length) {
        return;
      }

      this.catchFish();
    },

    getSeaCreatures () {
      if (this.seaCreatures.length) {
        return;
      }

      this.catchSeaCreatures();
    },

    add (critter, type) {
      const payload = {
        id: critter.id,
        critterType: type,
        isDonated: true,
      };

      this.quickAddedCritters.push({
        critterType: type,
        critter,
      });

      this.setDonatedCritterStatus(payload);
    },

    undo (critter, type, index) {
      const payload = {
        id: critter.id,
        critterType: type,
        isDonated: false,
      };

      this.quickAddedCritters.splice(index, 1);
      this.setDonatedCritterStatus(payload);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import 'Core/scss/_abstracts.scss';

  .autocomplete {
    @include breakpoint(medium) {
      width: 60%;
    }

    margin: 0 auto;

    &.is-active {
      .autocomplete__results {
        display: block;
      }
    }

    &__input {
      width: 100%;
      height: 40px;
      padding: 0 12px;
      border-radius: 5px;
      border: 1px solid #a6a6a6;
      -webkit-appearance: none;
      background-color: white;
      font-size: 16px;
    }

    &__results {
      display: none;
      max-height: 340px;
      overflow-y: auto;
      background-color: white;
    }

    &__group {
      margin-bottom: 10px;
    }

    &__group-name {
      display: block;
      padding: 12px;
      font-size: 14px;
    }

    &__option {
      @extend %button-reset;
      display: block;
      padding: 12px;
      width: 100%;
      text-align: left;
      text-transform: capitalize;

      &:hover {
        background-color: #f1f1f1;
      }
    }

    &__icon {
      height: 30px;
      width: 30px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }

  .critters-list {
    @include breakpoint(medium) {
      width: 80%;
      margin: 0 auto;
    }
  }

  .critter {
    display: flex;
    align-items: center;

    &__image {
      height: 100px;
      width: 100px;
      flex: 0 0 auto;
      margin-right: 20px;
      background: center/contain no-repeat #fffcdd;
    }

    &__name {
      flex: 1 0 0;
      margin-right: 20px;
      text-transform: capitalize;
    }
  }
</style>
