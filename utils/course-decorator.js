import _ from 'lodash'

export const courseDecorator = function(course, store) {
  let videos = videosFor(course, store);

  return {
    ...course,
    videos,
    numChapters: course.chapter_ids.length,
    numVideos: videos.length,
    duration: _.sum(videos.map(v => v.duration))
  }
}

const videosFor = (course, store) => {
  let getCourse = store.getters['courses/get']
  let getVideo = store.getters['videos/get']
  let chapters = course.chapter_ids.map(c_id => getCourse(c_id))
  let video_ids = course.video_ids.concat(chapters.flatMap(c => c.video_ids))
  return video_ids.map(v_id => getVideo(v_id))
}

export const sortCourse = (course, store) => {
  let getCourse = store.getters['courses/get']
  let getVideo = store.getters['videos/get']

  if(!course){ return {course, sortedItems: []} }

  let videos = course.video_ids.map(v => getVideo(v))
  let courses = course.chapter_ids.map(c => getCourse(c))

  let allItems = videos.concat(courses)
  let sortedItems = allItems.sort((i, j) => {
    return (Number(i.order) > Number(j.order)) ? 1 : -1
  })
  return {...course, sortedItems}
}

export const orderValueOfLastItem = (course, store) => {
  let sortedItems = sortCourse(course, store).sortedItems
  let lastItem = sortedItems[sortedItems.length - 1]
  return Number(lastItem && lastItem.order || 0)
}

export const percentVideosComplete = (videos, store) => {
  let isPlayed = store.getters['user/videoIsPlayed']

  let numVideos = videos.length;
  let numCompletedVideos = videos.filter(v => isPlayed(v.id)).length

  return Math.floor(numCompletedVideos / numVideos * 100)
}

export default courseDecorator;