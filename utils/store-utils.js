export const getData = async function(url, axios) {
  let response = await axios.get(url)
  return {
    data: response.data.data,
    included: response.data.included
  }
}

export const postData = async function(url, axios) {
  let response = await axios.post(url)
  return {
    data: response.data.data,
    included: response.data.included
  }
}

export const editMutation = function(storeData, item) {
  // This works, but doesn't seem the optimal way.
  // Putting it into a utility so I can fix them all at once when I discover a better way
  let storeItem = storeData.find(i => i.id == item.id)
  let index = storeData.indexOf(storeItem)
  storeData.splice(index, 1, item)
}


export const deserializeVideos = function(videos) {
  videos.forEach(v => {
    let courseData = v.relationships.course.data
    v.attributes.course_id = courseData && courseData.id;
    if(v.attributes.published_at) {
      v.attributes.published_at = new Date(v.attributes.published_at)
    }
  });
}

export const deserializeCourses = function(courses) {
  courses.forEach(c => {
    c.attributes.id = c.id
    c.attributes.parent_id = c.relationships.parent.data && c.relationships.parent.data.id
    c.attributes.chapter_ids = c.relationships.chapters.data.map(c => c.id) || []
    c.attributes.video_ids = c.relationships.videos.data.map(v => v.id) || []
  })
}
