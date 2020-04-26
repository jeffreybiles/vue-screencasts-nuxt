import {deserializeVideos, getData} from "~/utils/store-utils";

export const state = () => ({
  users: [],
})

export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  MARK_VIDEO_PLAYED(state, {videoId, user}) {
    let playedVideos = user.played_video_ids.concat(videoId);
    user.played_video_ids = playedVideos;
  },
}

export const actions = {
  async loadAll({commit}){
    let {data: users} = await getData('/users', this.$axios)
    commit('SET_USERS', users.map(u => u.attributes));
  },
  markVideoPlayed({commit, rootState}, videoId) {
    if(rootState.auth.loggedIn){
      commit('MARK_VIDEO_PLAYED', {videoId, user: rootState.auth.user});
      this.$axios.post(`/video_plays`, {
        video_id: videoId
      });
    }
  },
  async loadByIdAndToken({commit}, {id, token}) {
    let response = await this.$axios.get(`/users/${id}/${token}`)
    return response.data.data.attributes
  }
}

export const getters = {
  playedVideos: (state, getters, rootState, rootGetters) => {
    let user = rootState.auth.user
    return user ? user.played_video_ids : [];
  },
  videoIsPlayed: (state, getters) => (videoId) => {
    return getters.playedVideos.includes(videoId)
  },
}
