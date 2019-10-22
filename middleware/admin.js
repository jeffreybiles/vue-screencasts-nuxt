export default async function({$auth, next, store, to}){
  let user = $auth.$state.user
  if(user && user.admin) {
    // nothing needs to be done bc user is confirmed
  } else {
    store.dispatch('snackbar/setSnackbar', {color: 'error', text: 'You must be an admin to view this page.'})
    next('/')
  }
}