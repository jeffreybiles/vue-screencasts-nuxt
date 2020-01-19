export const getData = async function(url, axios) {
  let response = await axios.get(url)
  return {
    data: response.data.data,
    included: response.data.included
  }
}

export const deserializeVideos = function(videos) {
  videos.forEach(v => {
    v.attributes.id = v.id;
    if(v.attributes.published_at) {
      v.attributes.published_at = new Date(v.attributes.published_at)
    }
  });
}