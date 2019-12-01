import {getData, deserializeCourses} from '@/utils/store-utils';

export const state = () => ({
  courses: []
})

export const mutations = {
  SET_COURSES(state, courses) {
    state.courses = courses
  }
}

export const actions = {
  async loadAll({commit}) {
    let {data: courses} = await getData('courses', this.$axios)
    deserializeCourses(courses)
    commit('SET_COURSES', courses.map(c => c.attributes))
  }
}

export const getters = {
  get: state => id => {
    return state.courses.find(c => c.id == id)
  }
}