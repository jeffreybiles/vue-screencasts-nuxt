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
  async loadAllVideos({commit}){
    let {data: videos} = await getData('/videos', this.$axios)

    deserializeVideos(videos);
    commit('SET_VIDEOS', videos.map(v => v.attributes));
  },
  async loadAllTags({commit}) {
    let {data: tags} = await getData('/tags', this.$axios)

    deserializeTags(tags)
    commit('SET_TAGS', tags.map(v => v.attributes));
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
    t.attributes.video_ids = t.relationships.videos.data.map(v => v.id)
  })
}

function deserializeVideos(videos) {
  videos.forEach(v => {
    v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
  });
}