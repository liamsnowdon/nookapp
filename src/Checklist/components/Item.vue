<template>
  <div class="checklist-item">
    <div class="checklist-item__name">
      {{ item.name }}
    </div>

    <div class="checklist-item__checkbox">
      <input
        v-model="isComplete"
        type="checkbox"
        @change="onCompleteChange"
      />
    </div>
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
      }

      this.setItem(payload);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
