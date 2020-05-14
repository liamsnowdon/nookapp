export default [
  {
    name: 'Common Butterfly',
    description: `The common butterfly is a small white butterfly that is similar to the yellow butterfly in all but 
      color. They sell for 80, 90 or 160 Bells depending on the game version. They fly slowly in circles, generally 
      around flowers, but can also be found flying freely.`,
    image: 'common-butterfly.jpg',
    location: 'Flying anywhere',
    price: 160,
    priceV2: 240,
    northMonths: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June'],
    southMonths: ['March', 'April', 'May', 'June', 'July', 'August', 'September'],
    timeOfDay: '4am to 7pm',
    notes: [
      'Not available in the rain',
    ],
  },
  {
    name: 'Scorpion',
    description: `The scorpion is a rare bug that lives on the ground during summer nights. It can be detected by the 
      sound of its movement, which is lighter and more rattling compared to the tarantula. If the player is bitten 
      by the scorpion, they will pass out and wake up in front of their home.`,
    image: 'scorpion.jpg',
    location: 'On the ground',
    price: 8000,
    priceV2: 12000,
    northMonths: ['May', 'June', 'July', 'August', 'September', 'October'],
    southMonths: ['November', 'December', 'January', 'February', 'March', 'April'],
    timeOfDay: '7pm to 4am',
    notes: [
      'Available in the rain',
    ],
  },
  {
    name: 'Flea',
    description: `The flea, Pulex irritans, is a bug in the Animal Crossing series that can be found from spring to 
      early winter. Fleas sell low no matter which villager played host to them, and likely a reference to the fact that
      they are despised (in the same way cockroaches only sell for 5 bells).`,
    image: 'flea.png',
    location: 'On villagers',
    price: 70,
    priceV2: 105,
    northMonths: ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
    southMonths: ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
    timeOfDay: 'All day',
    notes: [
      'Available in the rain',
    ],
  },
  {
    name: 'Moth',
    description: `The moth is a nocturnal bug that can be found on cloudy nights. Players seem to detest them even more 
      than cockroaches. Moths are usually found by bright lights, but can be chased well away from lights where 
      they will eventually disappear into the sky in some games.`,
    image: 'moth.jpg',
    location: 'Near outside lights',
    price: 130,
    priceV2: 195,
    northMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    southMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    timeOfDay: '7pm to 4am',
  },
];
