export default async function({$auth, route, redirect, store}) {
  if(!$auth.user) {
    const REDIRECT_URL = '/login?redirect=' + route.path
    store.dispatch('snackbar/setSnackbar', {color: 'error', text: "You must be logged in to view that page."})
    redirect(REDIRECT_URL)
  }
}

