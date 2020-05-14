<template>
  <div class="gallery">
    <gallery-filters />

    <template v-if="loading">
      Loading...
    </template>

    <template v-else>
      <div class="gallery__grid">
        <button
          v-for="critter in critters"
          :key="critter.id"
          @click="setSelectedCritter(critter)"
          :style="{backgroundImage: `url(http://acnhapi.com/icons/${critterType}/${critter.id}`}"
          :class="{'is-active': isActiveCritter(critter.id)}"
          class="gallery__item"
        >
        <span class="gallery__item-hover">
          {{ critter.name['name-en'] }}
        </span>
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import GalleryFilters from './GalleryFilters';

export default {
  name: 'Gallery',

  props: {
    critters: {
      type: Object,
      required: true,
    },
    critterType: {
      type: String,
      required: true,
    },
  },

  components: {
    GalleryFilters,
  },

  data () {
    return {

    };
  },

  computed: {
    loading () {
      return this.$store.state.loading;
    },
  },

  methods: {
    setSelectedCritter (critter) {
      if (this.critterType === 'bugs') {
        if (this.$store.state.selectedBug.id === critter.id) {
          return;
        }

        this.$store.commit('setSelectedBug', critter);
      } else {
        if (this.$store.state.selectedFish.id === critter.id) {
          return;
        }

        this.$store.commit('setSelectedFish', critter);
      }
    },

    isActiveCritter (id) {
      if (this.critterType === 'bugs') {
        return this.$store.state.selectedBug.id === id;
      } else {
        return this.$store.state.selectedFish.id === id;
      }
    },
  },
};
</script>

<style lang="scss">
  .gallery {
    $block: &;

    &__grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 20px;
      max-height: 100%;
      overflow-y: auto;
    }

    &__item {
      position: relative;
      height: 150px;
      padding: 0;
      border: 1px solid black;
      border-radius: 50%;
      background: center / contain no-repeat #fffcdd;
      appearance: none;
      overflow: hidden;

      img {
        max-width: 100%;
        height: auto;
      }

      &:hover,
      &:focus {
        #{$block}__item-hover {
          opacity: 1;
          visibility: visible;
        }
      }

      &:focus {
        outline: 0;
      }

      &.is-active {
        box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.75);
      }
    }

    &__item-hover {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 10px;
      border-radius: 50%;
      opacity: 0;
      visibility: hidden;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      font-size: 16px;
      font-weight: bold;
      line-height: 1.5;
      text-transform: capitalize;
      transition: opacity .5s ease-in-out, visibility .5s ease-in-out;
      cursor: pointer;
    }
  }
</style>
