export default async function({$auth, redirect, store}) {
  if(!$auth.user) {
    store.dispatch('snackbar/setSnackbar', {color: 'error', text: "You must be logged in to view that page."})
    redirect('/login')
  }
}
