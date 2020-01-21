export const state = () => ({
  snackbars: []
})
  
export const mutations = {
  ADD(state, snackbar) {
    state.snackbars = state.snackbars.concat(snackbar);
  },
  REMOVE(state, snackbar) {
    snackbar.showing = false;
  }
}
  
export const actions = {
  create({commit}, snackbar) {
    snackbar.showing = true;
    snackbar.color = snackbar.color || 'success';
    commit('ADD', snackbar);
  },

  remove({commit}, snackbar) {
    commit('REMOVE', snackbar)
  }
}