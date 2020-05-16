import { SORT_OPTIONS } from '../constants';

export default {
  loading: false,
  fish: [],
  bugs: [],
  selectedFish: {},
  selectedBug: {},
  filters: {
    sort: SORT_OPTIONS.ID,
    searchTerm: '',
    location: '',
    minBasePrice: null,
    maxBasePrice: null,
  },
};
