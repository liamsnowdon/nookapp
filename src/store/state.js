import { SORT_OPTIONS } from '../constants';

export default {
  loading: false,
  errorLoadingFish: false,
  errorLoadingBugs: false,
  settingsModalOpen: false,
  settings: {
    theme: 'light',
  },
  fish: [],
  bugs: [],
  selectedFish: {},
  selectedBug: {},
  isStorageAvailable: false,
  caughtFish: [],
  caughtBugs: [],
  filters: {
    sort: SORT_OPTIONS.ID,
    searchTerm: '',
    location: '',
    minBasePrice: '',
    maxBasePrice: '',
    caught: '',
    northernMonthsAvailable: [],
    southernMonthsAvailable: [],
  },
};
