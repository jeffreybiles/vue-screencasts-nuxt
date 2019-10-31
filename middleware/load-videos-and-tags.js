import RSVP from 'rsvp'

export default async function({store}){
  let isInitialPageLoad = store.state.videos.videos.length == 0;
  
  if(isInitialPageLoad){
    await RSVP.all([
      store.dispatch('videos/loadAll'),
      store.dispatch('tags/loadAll')
    ])
  }
}