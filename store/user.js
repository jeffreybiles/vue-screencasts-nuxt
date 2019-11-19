export const mutations = {
  MARK_VIDEO_PLAYED(state, {videoId, user}) {
    let playedVideos = user.played_video_ids.concat(videoId);
    user.played_video_ids = playedVideos;
  },  
}

export const actions = {
  markVideoPlayed({commit, rootState}, videoId) {
    if(rootState.auth.loggedIn){
      commit('MARK_VIDEO_PLAYED', {videoId, user: rootState.auth.user});
      this.$axios.post(`/video_plays`, {
        video_id: videoId
      });
    }
  },
}

export const getters = {
  playedVideos: (state, getters, rootState, rootGetters) => {
    let user = rootState.auth.user
    return user ? user.played_video_ids : [];
  },
  videoIsPlayed: (state, getters) => videoId => {
    return getters.playedVideos.includes(videoId)
  }
}