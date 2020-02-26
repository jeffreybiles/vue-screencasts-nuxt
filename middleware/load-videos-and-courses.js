import RSVP from 'rsvp'

export default async function({store, from}){
  if(!store.state.isLoaded){
    await RSVP.all([
      store.dispatch('videos/loadAll'),
      store.dispatch('courses/loadAll')
    ])
    store.commit('FINISH_LOADING')
  }
}