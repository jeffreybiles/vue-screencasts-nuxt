import RSVP from 'rsvp'

export default async function({store}){
  if(!store.state.isLoaded){
    await RSVP.all([
      store.dispatch('loadAllVideos'),
      store.dispatch('loadAllTags')
    ])
    store.commit('FINISH_LOADING')
  }
}