import { SORT_OPTIONS } from '@/Critterpedia/constants';

export default {
  loading: false,
  errorLoadingFish: false,
  errorLoadingBugs: false,
  errorLoadingSeaCreatures: false,
  settingsModalOpen: false,
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
  },
};
