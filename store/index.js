
export const strict = true

export const state = () => ({
  isLoaded: false,
})

export const mutations = {
  FINISH_LOADING(state) {
    state.isLoaded = true;
  }
}
