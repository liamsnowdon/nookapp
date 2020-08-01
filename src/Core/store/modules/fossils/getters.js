export default {
  hasDonatedFossils (state) {
    return !!state.donatedFossils.length;
  },

  getDonatedFossil: (state) => (id) => {
    return state.donatedFossils.find(fossil => fossil === id);
  },
};
