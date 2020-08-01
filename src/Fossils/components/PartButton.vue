<template>
  <button
    class="part"
    @click="onClick()"
  >
    <i v-if="isDonated"
       class="fa fa-check-circle"
    />
    <i v-else
       class="fa fa-times-circle"
    />

    <img
      :src="part.image_uri"
      :alt="part.name['name-EUen']"
    />

    {{ part.name['name-EUen'] }}
  </button>
</template>

<script>
import { mapGetters } from 'vuex';
import { MODULE, GETTERS } from 'Fossils/constants/vuex';

export default {
  name: 'PartButton',

  props: {
    part: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters(MODULE, [
      GETTERS.GET_DONATED_FOSSIL,
    ]),

    isDonated () {
      return !!this.getDonatedFossil(this.part['file-name']);
    },
  },

  methods: {
    onClick () {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss">
  .part {
    @extend %button-reset;

    position: relative;
    padding: 10px;
    margin: 0 20px 20px 0;
    border: 1px solid black;
    background-color: #27273e;
    color: white;
    text-transform: capitalize;

    @include breakpoint(medium) {
      padding: 15px;
    }

    img {
      display: block;
      margin-bottom: 10px;
    }

    .fa {
      position: absolute;
      top: 5px;
      right: 8px;
      font-size: 30px;
    }

    .fa-times-circle {
      color: #e84444;
    }

    .fa-check-circle {
      color: #62d262;
    }
  }
</style>
