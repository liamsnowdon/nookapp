import { SORT_OPTIONS } from 'Critterpedia/constants/sort-options';

export default {
  loading: false,
  errorLoadingFish: false,
  errorLoadingBugs: false,
  errorLoadingSeaCreatures: false,
  settingsModalOpen: false,
  quickAddModalOpen: false,
  detailModalOpen: false,
  settings: {
    hemisphere: '',
  },
  fish: [],
  bugs: [],
  seaCreatures: [],
  selectedFish: {},
  selectedBug: {},
  selectedSeaCreature: {},
  donatedFish: [],
  donatedBugs: [],
  donatedSeaCreatures: [],
  filters: {
    sort: SORT_OPTIONS.ID,
    searchTerm: '',
    location: '',
    minBasePrice: '',
    maxBasePrice: '',
    donated: '',
    northernMonthsAvailable: [],
    southernMonthsAvailable: [],
    availableNow: false,
  },
};
