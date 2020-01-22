
export const strict = process.env.NODE_ENV !== 'production';

export const state = () => ({
  isLoaded: false,
})

export const mutations = {
  FINISH_LOADING(state) {
    state.isLoaded = true;
  }
}
