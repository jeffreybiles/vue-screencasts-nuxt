import {getData, deserializeVideos} from '@/utils/store-utils';
import Vue from 'vue'

export const state = () => ({
  videos: [],
})

export const mutations = {
  SET_VIDEOS(state, videos) {
    state.videos = videos;
  },
  ADD_VIDEO(state, video) {
    let videos = state.videos.concat(video);
    state.videos = videos;
  },
  DELETE_VIDEO(state, videoId){
    let videos = state.videos.filter(v => v.id != videoId)
    state.videos = videos;
  },
  EDIT_VIDEO(state, video) {
    // This works, but doesn't seem the optimal way.
    let v = state.videos.find(v => v.id == video.id)
    let index = state.videos.indexOf(v)
    state.videos.splice(index, 1, video)
  }
}

export const actions = {
  async loadAll({commit, dispatch}){
    let {data: videos} = await getData('/videos', this.$axios)
    deserializeVideos(videos)

    commit('SET_VIDEOS', videos.map(v => v.attributes));
  },
  async create({commit}, video) {
    let response = await this.$axios.post('/videos', video);
    let savedVideo = response.data.data.attributes;
    commit('ADD_VIDEO', savedVideo);
    return savedVideo;
  },
  async delete({commit}, video) {
    let response = await this.$axios.delete(`/videos/${video.id}`);
    if(response.status == 200 || response.status == 204){
      commit('DELETE_VIDEO', video.id);
    }
  },
  async edit({commit}, video) {
    let response = await this.$axios.put(`/videos/${video.id}`, video);
    let newVideo = response.data.data.attributes;
    commit('EDIT_VIDEO', newVideo);
    return newVideo;
  },
}

export const getters = {
  get: state => id => {
    return state.videos.find(v => v.id == id) || {}
  }
}