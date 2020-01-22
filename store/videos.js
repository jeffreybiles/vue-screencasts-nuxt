import {getData, deserializeVideos} from '@/utils/store-utils';
import Vue from 'vue';

export const state = () => ({
  videos: [],
})

export const mutations = {
  SET(state, videos) {
    state.videos = videos;
  },
  ADD(state, video) {
    let videos = state.videos.concat(video);
    state.videos = videos;
  },
  DELETE(state, videoId){
    let videos = state.videos.filter(v => v.id != videoId)
    state.videos = videos;
  },
  EDIT(state, newVideo) {
    let vIndex = state.videos.findIndex(v => v.id == newVideo.id)
    
    Vue.set(state.videos, vIndex, newVideo)
  },
  UPDATE_FIELD(state, {video, fieldName, newValue}) {
    video[fieldName] = newValue;
  }
}

export const actions = {
  async loadAll({commit, dispatch}){
    let {data: videos} = await getData('/videos', this.$axios)
    deserializeVideos(videos)

    commit('SET', videos.map(v => v.attributes));
  },
  async create({commit}, video) {
    let response = await this.$axios.post('/videos', video);
    let savedVideo = response.data.data.attributes;
    commit('ADD', savedVideo);
    return savedVideo;
  },
  async delete({commit}, video) {
    let response = await this.$axios.delete(`/videos/${video.id}`);
    if(response.status == 200 || response.status == 204){
      commit('DELETE', video.id);
    }
  },
  async edit({commit}, video) {
    let response = await this.$axios.put(`/videos/${video.id}`, video);
    let newVideo = response.data.data;
    deserializeVideos([newVideo])
    commit('EDIT', newVideo.attributes);
    return newVideo.attributes;
  },
  async updateField({commit}, {video, fieldName, newValue}) {
    commit('UPDATE_FIELD', {video, fieldName, newValue})
  }
}

export const getters = {
  get: state => id => {
    return state.videos.find(v => v.id == id) || {}
  }
}