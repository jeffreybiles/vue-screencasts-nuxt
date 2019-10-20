export const state = () => ({
  videos: [],
  tags: [],
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
  async loadAllVideos({commit}) {
    let response = await this.$axios.get('/videos')
    let videos = response.data.data;

    videos.forEach(v => {
      v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
    });

    let tags = response.data.included;
    tags.forEach(t => {
      t.attributes.id = t.id;
    })

    commit('SET_VIDEOS', videos.map(v => v.attributes))
    commit('SET_TAGS', tags.map(t => t.attributes))
  },
  async loadOneVideo({commit}, {videoId}) {
    let response = await this.$axios.get(`/videos/${videoId}`)
    let video = response.data.data;

    video.attributes.tag_ids = video.relationships.tags.data.map(t => t.id);

    let tags = response.data.included;
    tags.forEach(t => {
      t.attributes.id = t.id;
    })

    commit('SET_TAGS', tags.map(t => t.attributes))
    commit('SET_VIDEOS', [video.attributes])
  },
  async loadTagAndRelationships({commit}, {tagId}) {
    let response = await this.$axios.get(`/tags/${tagId}`)

    let videosOnTag = response.data.included.filter(i => i.type === 'video')
    videosOnTag.forEach(v => {
      v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
    });
    let tags = response.data.included.filter(i => i.type === 'tag')
    tags.forEach(t => {
      t.attributes.id = t.id
    })

    commit('SET_VIDEOS', videosOnTag.map(v => v.attributes))
    commit('SET_TAGS', tags.map(t => t.attributes))
  }
}