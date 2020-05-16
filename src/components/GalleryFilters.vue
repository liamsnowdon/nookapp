<template>
  <div class="gallery__filters">
    <div class="gallery__filters-search">

      <!-- Sort -->
      <label for="sort">Sort</label>
      <select
        id="sort"
        v-model="sort"
        @change="onSortChange"
      >
        <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.displayValue }}</option>
      </select>

      <!-- Search term -->
      <label for="searchTerm">Search by name or ID</label>
      <input
        id="searchTerm"
        v-model="searchTerm"
        @input="onSearchTermInput"
        type="search"
        :placeholder="isFish ? 'Sea Bass' : 'Common Butterfly'"
      />

      <!-- Location -->
      <template v-if="isFish">
        <label for="fish-locations">Location</label>
        <select
          id="fish-locations"
          v-model="location"
          @change="onLocationChange"
        >
          <option disabled value="">Select a location</option>
          <option v-for="(location, index) in fishLocations" :key="index" :value="location">{{ location }}</option>
        </select>
      </template>

      <template v-if="isBug">
        <label for="bug-locations">Location</label>
        <select
          id="bug-locations"
          v-model="location"
          @change="onLocationChange"
        >
          <option disabled value="">Select a location</option>
          <option v-for="(location, index) in bugLocations" :key="index" :value="location">{{ location }}</option>
        </select>
      </template>

      <!-- Min Base Price -->
      <label for="min-base-price">Min Base Price</label>
      <input
        id="min-base-price"
        v-model.number="minBasePrice"
        @input="onMinBasePriceInput"
        type="number"
        placeholder="200"
      />

      <!-- Min Base Price -->
      <label for="max-base-price">Max Base Price</label>
      <input
        id="max-base-price"
        v-model.number="maxBasePrice"
        @input="onMaxBasePriceInput"
        type="number"
        placeholder="4000"
      />
    </div>
  </div>
</template>

<script>
import { SORT_OPTIONS } from '../constants';

export default {
  name: 'GalleryFilters',

  props: {
    critterType: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      sort: 'id',
      searchTerm: '',
      location: '',
      minBasePrice: null,
      maxBasePrice: null,
      sortOptions: [
        {
          displayValue: 'ID',
          value: SORT_OPTIONS.ID,
        },
        {
          displayValue: 'Alphabetical (A - Z)',
          value: SORT_OPTIONS.ALPHABETICAL_ASCENDING,
        },
        {
          displayValue: 'Alphabetical (Z - A)',
          value: SORT_OPTIONS.ALPHABETICAL_DESCENDING,
        },
        {
          displayValue: 'Price (Highest to Lowest)',
          value: SORT_OPTIONS.PRICE_DESCENDING,
        },
        {
          displayValue: 'Price (Smallest to Lowest)',
          value: SORT_OPTIONS.PRICE_ASCENDING,
        },
      ],
      fishLocations: [
        'Pond',
        'River',
        'River (Clifftop)',
        'River (Mouth)',
        'River (Clifftop) & Pond',
        'Sea',
        'Sea (when raining or snowing)',
        'Pier',
      ],
      bugLocations: [
        'Flying',
        'Flying near hybrid flowers',
        'Flying by light',
        'On trees',
        'On the ground',
        'On flowers',
        'On white flowers',
        'Shaking trees',
        'Underground',
        'On ponds and rivers',
        'On tree stumps',
        'On palm trees',
        'Under trees',
        'Near trash',
        'On beach rocks',
        'On the beach',
        'On rotten food',
        'On villagers',
        'On rocks (when raining)',
        'Hitting rocks',
      ],
    };
  },

  computed: {
    isBug () {
      return this.critterType === 'bugs';
    },

    isFish () {
      return this.critterType === 'fish';
    },
  },

  methods: {
    onSearchTermInput () {
      this.$store.commit('setFiltersSearchTerm', this.searchTerm);
    },

    onLocationChange () {
      this.$store.commit('setFiltersLocation', this.location);
    },

    onMinBasePriceInput () {
      this.$store.commit('setFiltersMinBasePrice', this.minBasePrice);
    },

    onMaxBasePriceInput () {
      this.$store.commit('setFiltersMaxBasePrice', this.maxBasePrice);
    },

    onSortChange () {
      this.$store.commit('setFiltersSort', this.sort);
    },
  },
};
</script>

<style lang="scss">

</style>
