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
    let {data: videos, included: tags} = await getData('/videos', this.$axios)

    deserializeVideos(videos)
    deserializeTags(tags)

    commit('SET_VIDEOS', videos.map(v => v.attributes))
    commit('SET_TAGS', tags.map(t => t.attributes))
  },
  async loadOneVideo({commit}, {videoId}) {
    let {data: video, included: tags} = await getData(`/videos/${videoId}`, this.$axios)

    deserializeVideos([video])
    deserializeTags(tags)

    commit('SET_TAGS', tags.map(t => t.attributes))
    commit('SET_VIDEOS', [video.attributes])
  },
  async loadTagAndRelationships({commit}, {tagId}) {
    let {included} = await getData(`/tags/${tagId}`, this.$axios)

    let videosOnTag = included.filter(i => i.type === 'video')
    deserializeVideos(videosOnTag)
    let tags = included.filter(i => i.type === 'tag')
    deserializeTags(tags)

    commit('SET_VIDEOS', videosOnTag.map(v => v.attributes))
    commit('SET_TAGS', tags.map(t => t.attributes))
  }
}

const deserializeTags = function(tags) {
  tags.forEach(t => {
    t.attributes.id = t.id;
  })
}

const deserializeVideos = function(videos) {
  videos.forEach(v => {
    v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
  });
}

const getData = async function(url, axios) {
  let response = await axios.get(url)
  return {
    data: response.data.data,
    included: response.data.included
  }
}