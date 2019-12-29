export const getData = async function(url, axios) {
  let response = await axios.get(url)
  return {
    data: response.data.data,
    included: response.data.included
  }
}

export const deserializeVideos = function(videos) {
  videos.forEach(v => {
    if(v.attributes.published_at) {
      v.attributes.published_at = new Date(v.attributes.published_at)
    }
  });
}

export const deserializeTags = function(tags) {
  tags.forEach(t => {
    t.attributes.id = t.id;
    t.attributes.video_ids = t.relationships.videos.data.map(v => v.id)
  })
}