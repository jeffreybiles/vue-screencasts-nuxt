export default async function({$auth, route, redirect, store}) {
  if(!$auth.loggedIn) {
    const REDIRECT_URL = '/auth?redirect=' + route.path
    store.dispatch('snackbar/setSnackbar', {color: 'error', text: "You must be logged in to view that page."})
    redirect(REDIRECT_URL)
  }
}

