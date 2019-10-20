export default async function({store}) {
  await store.dispatch('loadAllVideos');
  await store.dispatch('loadAllTags');
}