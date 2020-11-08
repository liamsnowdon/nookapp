<template>
  <div class="checklist-item">
    <div class="checklist-item__checkbox">
      <div class="c-checkbox">
        <input
          :id="item.name"
          v-model="isComplete"
          type="checkbox"
          class="c-checkbox__input"
          :disabled="item.completed || disabled"
          @change="onCompleteChange"
        />
        <label
          :for="item.name"
          class="c-checkbox__label"
        >
          <span class="c-checkbox__checkbox"></span>
        </label>
      </div>
    </div>

    <h3 class="checklist-item__name">
      {{ item.name }}
    </h3>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { MODULE, MUTATIONS } from 'Checklist/constants/vuex';

export default {
  name: 'Item',

  data () {
    return {
      isComplete: false,
    };
  },

  props: {
    item: {
      type: Object,
      required: true,
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  created () {
    this.isComplete = this.item.completed;
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_ITEM,
    ]),

    onCompleteChange () {
      const payload = {
        ...this.item,
        completed: this.isComplete,
      };

      this.setItem(payload);
    },
  },
};
</script>

<style lang="scss" scoped>
  .checklist-item {
    display: flex;
    align-items: center;
    margin: 0 0 10px 0;
    padding: 20px;
    background-color: #569a52;
    border-radius: 5px;

    &__checkbox {

    }

    &__name {
      flex: 1 0 0;
      margin: 0;
      text-align: left;
    }
  }
</style>
