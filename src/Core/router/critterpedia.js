import Critterpedia from 'Critterpedia/views/Critterpedia';
import Fish from 'Critterpedia/views/Fish';
import Bugs from 'Critterpedia/views/Bugs';
import SeaCreatures from 'Critterpedia/views/SeaCreatures';

export default {
  path: '/critterpedia',
  name: 'Critterpedia',
  component: Critterpedia,
  children: [
    {
      path: '',
      redirect: {
        name: 'Fish',
      },
    },
    {
      path: 'fish',
      name: 'Fish',
      component: Fish,
    },
    {
      path: 'bugs',
      name: 'Bugs',
      component: Bugs,
    },
    {
      path: 'sea-creatures',
      name: 'Sea Creatures',
      component: SeaCreatures,
    },
  ],
};
