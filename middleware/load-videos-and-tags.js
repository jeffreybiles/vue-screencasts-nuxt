import RSVP from 'rsvp'

export default async function({store}){
    await RSVP.all([
      store.dispatch('loadAllVideos'),
      store.dispatch('loadAllTags')
    ])
}