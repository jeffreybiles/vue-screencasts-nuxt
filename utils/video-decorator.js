export const getThumbnail = function(video, store) {
  let getCourse = store.getters['courses/get'];

  if(video.thumbnail) {
    return video.thumbnail
  } else {
    let course = getCourse(video.course_id)
    return course && course.image_url
  }  
}