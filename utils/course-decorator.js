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
  let videos = course.video_ids.map(v_id => getVideo(v_id))
  let chapterVideos = chapters.flatMap(chapter => {
    return chapter.video_ids.map(v_id => {
      let video = getVideo(v_id);
      return {...video, order: Number(video.order) + Number(chapter.order) * 1000}
    })
  })
  return videos.concat(chapterVideos)
}

export const sortCourse = (course, store) => {
  let getCourse = store.getters['courses/get']
  let getVideo = store.getters['videos/get']

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

export default courseDecorator;