
export const strict = false

// Oh well... if it's good enough for VueX default, it's good enough for us.


export const state = () => ({
  isLoaded: false,
})

export const mutations = {
  FINISH_LOADING(state) {
    state.isLoaded = true;
  }
}