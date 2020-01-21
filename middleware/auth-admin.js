export default async function({$auth, redirect, store}) {
  let user = $auth.user;
  if(user && user.admin) {
    // let the user in
  } else {
    store.dispatch('snackbar/create', {color: 'error', text: "You must be an admin to view that page."})
    redirect('/')
  }
}