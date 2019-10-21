import RSVP from 'rsvp'

export default async function({store}){
  if(!store.state.isLoaded){
    await RSVP.all([
      store.dispatch('videos/loadAll'),
      store.dispatch('tags/loadAll')
    ])
    store.commit('FINISH_LOADING')
  }
}