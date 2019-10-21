export const getData = async function(url, axios) {
  let response = await axios.get(url)
  return {
    data: response.data.data,
    included: response.data.included
  }
}

export const deserializeVideos = function(videos) {
  videos.forEach(v => {
    v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
    v.attributes.id = v.id;
  });
}

export const deserializeTags = function(tags) {
  tags.forEach(t => {
    t.attributes.id = t.id;
    t.attributes.video_ids = t.relationships.videos.data.map(v => v.id)
  })
}