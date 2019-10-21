import RSVP from 'rsvp'

export default async function({store, from}){
  let isInitialPageLoad = !from;
  if(isInitialPageLoad){
    await RSVP.all([
      store.dispatch('videos/loadAll'),
      store.dispatch('tags/loadAll')
    ])
  }
}