import { SORT_OPTIONS } from '../constants';

export default {
  loading: false,
  errorLoadingFish: false,
  errorLoadingBugs: false,
  errorLoadingSeaCreatures: false,
  settingsModalOpen: false,
  quickAddModalOpen: false,
  settings: {
    hemisphere: '',
  },
  fish: [],
  bugs: [],
  seaCreatures: [],
  selectedFish: {},
  selectedBug: {},
  selectedSeaCreature: {},
  isStorageAvailable: false,
  caughtFish: [],
  caughtBugs: [],
  caughtSeaCreatures: [],
  filters: {
    sort: SORT_OPTIONS.ID,
    searchTerm: '',
    location: '',
    minBasePrice: '',
    maxBasePrice: '',
    caught: '',
    northernMonthsAvailable: [],
    southernMonthsAvailable: [],
    availableNow: false,
  },
};
