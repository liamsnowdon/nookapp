<template>
  <div class="checklist-new-item">
    <form
      class="checklist-new-item__form"
      @submit.prevent="confirm"
    >
      <span class="checklist-new-item__number"></span>

      <input
        v-model="name"
        class="checklist-new-item__input"
        type="text"
        required
        ref="input"
      />

      <button
        class="checklist-new-item__button"
      >
        <i class="fa fa-check" />
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewItem',

  data () {
    return {
      name: '',
    };
  },

  mounted () {
    this.$refs.input.focus();
  },

  methods: {
    confirm () {
      const payload = {
        name: this.name,
      };

      this.name = '';

      this.$emit('addItem', payload);
    },
  },
};
</script>

<style lang="scss">
  .checklist-new-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    padding: 20px;
    border-radius: 5px;
    background-color: #569a52;

    &__form {
      display: flex;
      width: 100%;
    }

    &__input {
      flex: 1 0 0;
      min-width: 0;
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

    &__button {
      @extend %button-reset;
      color: white;
      font-size: 40px;

      &:last-child {
        margin-left: 10px;
      }
    }
  }
</style>
