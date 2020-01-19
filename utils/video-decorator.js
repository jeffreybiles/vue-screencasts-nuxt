export const getThumbnail = function(video, store) {
  if(video.thumbnail) {
    return video.thumbnail
  } else {
    return getCourseThumbnail(video.course_id, store);
  }  
}

export const getCourseThumbnail = function(course_id, store) {
  let getCourse = store.getters['courses/get'];

  let course = getCourse(course_id);
  if(course) {
    return course.image_url || 
           (course.parent_id && getCourseThumbnail(course.parent_id, store)) || 
           '' 
  }
}