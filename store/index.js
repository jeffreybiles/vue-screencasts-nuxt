export const state = () => ({
  videos: [],
})

export const mutations = {
  SET_VIDEOS (state, videos) {
    state.videos = videos
  },
  SET_TAGS (state, tags) {
    state.tags = tags
  }
}

export const actions = {
  async loadAllVideos({commit}){
    let response = await this.$axios.get('/videos')
    let videos = response.data.data;
  
    videos.forEach(v => {
      v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
    });

    commit('SET_VIDEOS', videos.map(v => v.attributes));
  
    let tags = response.data.included;
    tags.forEach(t => {
      t.attributes.id = t.id;
    })

    commit('SET_TAGS', tags.map(t => t.attributes))
  }
}