import RSVP from 'rsvp'

export default async function({store, from}) {
  let isInitialLoad = !from;
  if(isInitialLoad){
    await RSVP.all([
      store.dispatch('loadAllVideos'),
      store.dispatch('loadAllTags')
    ])
  }
}