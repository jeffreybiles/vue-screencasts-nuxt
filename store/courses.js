import {getData, deserializeCourses} from '@/utils/store-utils';
import { create } from 'domain';

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