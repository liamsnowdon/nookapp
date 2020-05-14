<template>
  <div class="gallery">
    <gallery-filters />

    <h2>Gallery</h2>
    <div class="gallery__grid">
      <button
        v-for="critter in critters"
        :key="critter.name"
        @click="setSelectedCritter(critter)"
        :style="{backgroundImage: `url(${publicPath}critters/${critterType}/${critter.image})`}"
        class="gallery__item"
      >
        <span class="gallery__item-hover">
          {{ critter.name }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import GalleryFilters from './GalleryFilters';

export default {
  name: 'Gallery',

  props: {
    critters: {
      type: Array,
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
      publicPath: process.env.BASE_URL,
    };
  },

  methods: {
    setSelectedCritter (critter) {
      this.$emit('setSelectedCritter', critter);
    },
  },
};
</script>

<style lang="scss">
  .gallery {
    $block: &;

    flex: 0 0 50%;

    &__grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 20px;
    }

    &__item {
      position: relative;
      height: 150px;
      padding: 0;
      border: 1px solid black;
      border-radius: 50%;
      background: center / contain no-repeat #eee;
      appearance: none;
      overflow: hidden;

      img {
        max-width: 100%;
        height: auto;
      }

      &:hover {
        #{$block}__item-hover {
          opacity: 1;
          visibility: visible;
        }
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
      transition: opacity .5s ease-in-out, visibility .5s ease-in-out;
      cursor: pointer;
    }
  }
</style>
