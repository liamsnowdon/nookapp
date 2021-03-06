<template>
  <div class="custom-checklist-cont">
    <div class="custom-checklist">
      <div class="checklist-items">
        <Item
          v-for="item in items"
          :key="item.name"
          :item="item"
          :checkable="false"
          :deletable="true"
          :editable="true"
          @change="onChange"
          @delete="onDelete"
        />

        <NewItem
          @addItem="addItem"
        />

        <div class="checklist-items__buttons">
          <Button
            :disabled="!items.length"
            @click="save"
          >
            Save
          </Button>

          <Button @click="cancel">
            Cancel
          </Button>
        </div>
      </div>

      <div class="checklist-ideas">
        <div class="checklist-ideas__inner">
          <h4>Need ideas?</h4>

          <button
            class="checklist-ideas__refresh"
            @click="generateIdeas"
          >
            <i class="fa fa-refresh" />
          </button>

          <p v-if="!ideas.length">
            We've run out of ideas! :(
          </p>

          <ul class="ideas">
            <Idea
              v-for="(idea, index) in ideas"
              :key="index"
              :idea="idea"
              :items="items"
              @add="addIdeaToItems"
            >
              {{ idea }}
            </Idea>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import NumberGenerator from 'Core/utilities/NumberGenerator';

import { MODULE, MUTATIONS } from 'Checklist/constants/vuex';

import IDEAS from 'Checklist/constants/ideas';
import Button from 'Core/components/Button.vue';
import Item from 'Checklist/components/Item.vue';
import NewItem from 'Checklist/components/NewItem.vue';
import Idea from 'Checklist/components/Idea.vue';

export default {
  name: 'CustomItems',

  components: {
    Button,
    Item,
    NewItem,
    Idea,
  },

  data () {
    return {
      items: [],
      ideas: [],
    };
  },

  mounted () {
    this.generateIdeas();
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_TYPE,
    ]),

    save () {
      const items = this.items.slice().map(item => {
        item.name = item.name.charAt(0).toUpperCase() + item.name.slice(1);

        return item;
      });

      if (!items.length) return;

      this.$emit('save', items);
    },

    cancel () {
      this.items = [];

      this.$emit('cancel');
    },

    addItem (item) {
      const id = this.items.length + 1;

      this.items.push({
        ...item,
        id,
      });
    },

    onChange (payload) {
      const index = this.items.findIndex(item => item.id === payload.id);

      this.items.splice(index, 1, payload);
    },

    onDelete (payload) {
      const index = this.items.findIndex(item => item.id === payload.id);

      this.items.splice(index, 1);
    },

    generateIdeas () {
      const maxIdeas = 10;
      const ideas = IDEAS.slice();

      this.ideas = [];

      for (let i = 0; i < maxIdeas; i++) {
        if (!ideas.length) {
          break;
        }

        const randomInt = NumberGenerator.getRandomIntegerInclusive(0, ideas.length - 1);
        const itemsIncludesIdea = this.items.findIndex(item => item.name.toLowerCase() === ideas[randomInt].toLowerCase()) !== -1;

        // We don't want the same idea twice
        if (itemsIncludesIdea) {
          ideas.splice(randomInt, 1);

          i--;
          continue;
        }

        this.ideas.push(ideas[randomInt]);
        ideas.splice(randomInt, 1);
      }
    },

    addIdeaToItems (idea) {
      const item = {
        name: idea,
      };

      this.addItem(item);
    },
  },
};
</script>

<style lang="scss" scoped>
  .custom-checklist-cont {
    max-width: 1024px;
    margin: 0 auto;
  }

  .custom-checklist {
    display: flex;
    max-width: 1024px;
    margin: 0 -15px;

    @include breakpoint(medium, down) {
      flex-direction: column;
    }
  }

  .checklist-items {
    flex: 1 0 0;
    padding: 0 15px;
    counter-reset: checklist;

    &__buttons {
      display: flex;
      justify-content: flex-end;
      margin: 20px 0 20px auto;

      @include breakpoint(medium) {
        margin: 20px 0 0 auto;
      }

      button {
        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
  }

  .checklist-ideas {
    flex: 0 0 300px;
    padding: 0 15px;
    border-radius: 5px;

    &__inner {
      padding: 20px;
      background-color: #569a52;
    }

    &__refresh {
      @extend %button-reset;
      color: white;
      font-size: 40px;
    }
  }

  .ideas {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: left;
  }
</style>
