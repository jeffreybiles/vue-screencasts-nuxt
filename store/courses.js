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
    let courseObject = response.data.data
    let newCourse = {...courseObject.attributes, id: course.id}
    commit('CREATE', newCourse)
    return newCourse
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