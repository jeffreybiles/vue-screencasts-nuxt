export default async function({$auth, redirect, store, route}) {
  if(!$auth.loggedIn) {
    store.dispatch('snackbar/setSnackbar', {color: 'error', text: "You must be logged in to view that page."})
    redirect(`/auth?redirect=${route.path}`)
  }
}