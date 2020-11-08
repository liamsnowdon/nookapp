<template>
  <div class="checklist-new-item">
    <button
      class="checklist-new-item__overlay"
      @click="hideAddButton"
    />

    <form
      class="checklist-new-item__form"
      @submit.prevent="save"
    >
      <input
        v-model="name"
        type="text"
        ref="input"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewItem',

  data () {
    return {
      showAddButton: true,
      name: '',
    };
  },

  methods: {
    hideAddButton () {
      this.showAddButton = false;
      this.$refs.input.focus();
    },

    save () {
      const payload = {
        name: this.name,
      };

      this.name = '';
      this.showAddButton = true;

      this.$emit('addItem', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
  .checklist-new-item {

  }
</style>
