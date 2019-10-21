export const state = () => ({
  snackbars: []
})
  
export const mutations = {
  SET_SNACKBAR(state, snackbar) {
    state.snackbars = state.snackbars.concat(snackbar);
  },
}
  
export const actions = {
  setSnackbar({commit}, snackbar) {
    snackbar.showing = true;
    snackbar.color = snackbar.color || 'success';
    commit('SET_SNACKBAR', snackbar);
  },
}