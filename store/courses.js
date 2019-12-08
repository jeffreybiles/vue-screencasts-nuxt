import {getData, postData, deserializeCourses, deserializeVideos, editMutation} from '@/utils/store-utils';

export const state = () => ({
  courses: []
})

export const mutations = {
  SET_COURSES(state, courses) {
    state.courses = courses
  },
  UPDATE(state, course) {
    let c = state.courses.find(c => c.id == course.id)
    c = course;
  },
  CREATE(state, course) {
    let courses = state.courses.concat(course);
    state.courses = courses
  },
  DELETE(state, courseId) {
    let courses = state.courses.filter(c => c.id != courseId)
    state.courses = courses;
  },
  EDIT(state, course) {
    editMutation(state.courses, course)
  }
}

export const actions = {
  async loadAll({commit}) {
    let {data: courses} = await getData('courses', this.$axios)
    deserializeCourses(courses)
    commit('SET_COURSES', courses.map(c => c.attributes))
  },
  async update({commit}, course) {
    commit('UPDATE', course)
    await this.$axios.put(`/courses/${course.id}`, course)
    return course
  },
  async create({commit}, course) {
    let response = await this.$axios.post(`/courses`, course)
    let newCourse = response.data.data
    deserializeCourses([newCourse])
    commit('CREATE', newCourse.attributes)
    return newCourse.attributes
  },
  async delete({commit}, course) {
    let response = await this.$axios.delete(`/courses/${course.id}`);
    if(response.status == 200 || response.status == 204){
      commit('DELETE', course.id);
    }
  },
  async attachVideo({commit}, {video, course}) {
    let {data: updatedVideo, included: [updatedCourse]} = await postData(`/courses/${course.id}/attach-video/${video.id}`, this.$axios)
    deserializeVideos([updatedVideo])
    deserializeCourses([updatedCourse])
    
    commit('videos/EDIT_VIDEO', updatedVideo.attributes, {root: true})
    commit('EDIT', updatedCourse.attributes)
    return {video: updatedVideo.attributes, course: updatedCourse.attributes}
  },
  async attachChapter({commit}, {chapter, course}) {
    let {data: updatedChapter, included: [updatedCourse]} = await postData(`/courses/${course.id}/attach-chapter/${chapter.id}`, this.$axios)
    deserializeCourses([updatedCourse, updatedChapter])

    commit('EDIT', updatedChapter.attributes)
    commit('EDIT', updatedCourse.attributes)
    return {course: updatedCourse.attributes, chapter: updatedChapter.attributes}
  },
  async detachVideo({commit}, {video, course}) {
    let {data: updatedCourse} = await postData(`/courses/${course.id}/detach-video/${video.id}`, this.$axios)
    deserializeCourses([updatedCourse])
    commit('EDIT', updatedCourse.attributes)
    
    video.course_id = null;
    commit('videos/EDIT_VIDEO', video, {root: true})

    return {course: updatedCourse}
  },
  async detachChapter({commit}, {chapter, course}) {
    let {data: updatedCourse} = await postData(`/courses/${course.id}/detach-chapter/${chapter.id}`, this.$axios)
    deserializeCourses([updatedCourse])
    commit('EDIT', updatedCourse.attributes)
    
    chapter.parent_id = null;
    commit('EDIT', chapter)

    return {course: updatedCourse}
  },
  async updateOrder({commit}, {course, item, intDirection, edge}) {
    let allItems = course.sortedItems
    let currentIndex = allItems.indexOf(item)
    let nextIndex = currentIndex + intDirection
    let nextNextIndex = nextIndex + intDirection

    let isOnEdge = currentIndex == edge
    if(isOnEdge) { return null}

    let next = allItems[nextIndex]
    let movingToEdge = nextIndex == edge
    if(movingToEdge) { 
      item.order = Number(next.order) + intDirection
      commit('EDIT', course)
      return null
    }

    let nextNext = allItems[nextNextIndex]
    item.order = (Number(next.order) + Number(nextNext.order)) / 2
    commit('EDIT', course)
  }
}

export const getters = {
  get: state => id => {
    return state.courses.find(c => c.id == id)
  },
  topLevel: state => {
    return state.courses.filter(c => ['course', 'standalone_chapter'].includes(c.series_type))
  }
}