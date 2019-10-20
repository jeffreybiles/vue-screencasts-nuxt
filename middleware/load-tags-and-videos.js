export default async function({store, from}) {
  let isInitialLoad = !from;
  if(isInitialLoad){
    await store.dispatch('loadAllVideos');
    await store.dispatch('loadAllTags');
  }
}