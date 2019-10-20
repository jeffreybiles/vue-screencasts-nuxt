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
    let {data: videos, included: tags} = await getData('/videos', this.$axios)

    deserializeVideos(videos);
    commit('SET_VIDEOS', videos.map(v => v.attributes));

    deserializeTags(tags);
    commit('SET_TAGS', tags.map(t => t.attributes))
  },
  async loadVideo({commit}, {videoId}) {
    let {data: video, included: tags} = await getData(`/videos/${videoId}`, this.$axios)

    deserializeVideos([video])
    commit('SET_VIDEOS', [video.attributes]);

    deserializeTags(tags);
    commit('SET_TAGS', tags.map(t => t.attributes))
  },
  async loadTagAndRelationships({commit}, {tagId}){
    let {included} = await getData(`/tags/${tagId}`, this.$axios)

    let videos = included.filter(i => i.type === 'video')
    deserializeVideos(videos)
    commit('SET_VIDEOS', videos.map(v => v.attributes))

    let tags = included.filter(i => i.type === 'tag')
    deserializeTags(tags)
    commit('SET_TAGS', tags.map(t => t.attributes))
  }
}

export const getters = {
  getVideo: state => id => {
    return state.videos.find(v => v.id == id)
  }
}

async function getData(route, $axios) {
  let response = await $axios.get(route);
  return {
    data: response.data.data,
    included: response.data.included
  }
}

function deserializeTags(tags) {
  tags.forEach(t => {
    t.attributes.id = t.id;
  })
}

function deserializeVideos(videos) {
  videos.forEach(v => {
    v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
  });
}