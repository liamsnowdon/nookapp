export default {
  getDonatedFossil: (state) => (id) => {
    return state.donatedFossils.find(fossil => fossil === id);
  },
};
