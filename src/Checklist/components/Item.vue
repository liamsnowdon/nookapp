<template>
  <div
    class="checklist-item"
  >
    <h3
      v-if="!editMode"
      class="checklist-item__name"
    >
      {{ item.name }}
    </h3>

    <form
      v-else
      class="checklist-item__form"
      @submit.prevent="onNameChange"
    >
      <span class="checklist-item__number"></span>

      <input
        v-model="name"
        class="checklist-item__input"
        required
        ref="input"
      />

      <button class="checklist-item__save">
        <i class="fa fa-check" />
      </button>

      <button
        class="checklist-item__save"
        type="button"
        @click="disableEditMode"
      >
        <i class="fa fa-times" />
      </button>
    </form>

    <button
      v-if="editable && !editMode"
      class="checklist-item__edit"
      @click="enableEditMode"
    >
      <i class="fa fa-pencil-square-o" />
    </button>

    <button
      v-if="deletable && !editMode"
      class="checklist-item__edit"
      @click="deleteItem"
    >
      <i class="fa fa-trash" />
    </button>

    <div
      v-if="checkable && !editMode"
      class="checklist-item__checkbox"
    >
      <div class="c-checkbox">
        <input
          :id="item.name"
          v-model="isComplete"
          type="checkbox"
          class="c-checkbox__input"
          :disabled="item.completed"
          @change="onCompleteChange"
        />
        <label
          :for="item.name"
          class="c-checkbox__label"
        >
          <span class="c-checkbox__checkbox mr-0"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { MODULE } from 'Checklist/constants/vuex';
import CHECKLIST_TYPE from 'Checklist/constants/checklist-type';

export default {
  name: 'Item',

  data () {
    return {
      isComplete: false,
      editMode: false,
      name: '',
    };
  },

  props: {
    item: {
      type: Object,
      required: true,
    },

    checkable: {
      type: Boolean,
      required: false,
      default: true,
    },

    deletable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  mounted () {
    // todo, ugh change this
    setTimeout(() => {
      this.isComplete = this.item.completed;
      this.name = this.item.name;
    }, 10);
  },

  computed: {
    ...mapState(MODULE, {
      checklistType: state => state.type,
    }),

    editable () {
      return this.checklistType === CHECKLIST_TYPE.CUSTOM;
    },
  },

  methods: {
    enableEditMode () {
      this.editMode = true;

      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },

    disableEditMode () {
      this.editMode = false;
      this.name = this.item.name;
    },

    onCompleteChange () {
      const payload = {
        ...this.item,
        completed: this.isComplete,
      };

      this.$emit('change', payload);
    },

    onNameChange () {
      const payload = {
        ...this.item,
        name: this.name,
      };

      this.editMode = false;
      this.$emit('change', payload);
    },

    deleteItem () {
      this.$emit('delete', this.item);
    },
  },
};
</script>

<style lang="scss" scoped>
  .checklist-item {
    $block: &;

    display: flex;
    align-items: center;
    margin: 0 0 10px 0;
    padding: 20px;
    background-color: #569a52;
    border-radius: 5px;

    &__checkbox {

    }

    &__edit {
      @extend %button-reset;
      color: white;
      font-size: 40px;

      &:not(:last-child) {
        margin-right: 20px;
      }
    }

    &__save {
      @extend %button-reset;
      margin-left: 20px;
      color: white;
      font-size: 40px;
    }

    &__name {
      flex: 1 0 0;
      margin: 0 0 1px 0;
      text-align: left;

      &::before {
        counter-increment: checklist;
        content: counter(checklist) ".";
      }
    }

    &__form {
      display: flex;
      width: 100%;
    }

    &__input {
      flex: 1 0 0;
      margin-right: 10px;
      appearance: none;
      background: none;
      border: 2px solid white;
      border-width: 0 0 2px 0;
      font-size: 24px;
      font-family: var(--global-font-family);
      font-weight: bold;
      color: white;

      &:focus {
        outline: 0;
      }

      &:not(:focus) {
        border-color: rgba(255, 255, 255, 0.5);
      }
    }

    &__number {
      font-size: 24px;
      font-weight: bold;
      line-height: 48px;
      margin-right: 5px;

      &::before {
        counter-increment: checklist;
        content: counter(checklist) ".";
      }
    }
  }
</style>
