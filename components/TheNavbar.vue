<template>
  <v-app-bar app color="green">
    <v-btn v-for="link in navLinks"
           :key="link.name"
           text 
           :to="link.to">
      {{link.text}}
    </v-btn>
    
    <v-spacer />
    
    <v-btn v-for="link in authLinks"
           :key="link.name"
           text
           :to="link.to"
           @click="link.click ? link.click() : null">
      {{link.text}}
    </v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    computed: {
      navLinks(){
        let links = [
          {text: "Vue Screencasts", to: "/"},
          {text: "Videos", to: "/videos"},
          {text: "Courses", to: "/courses"},
          {text: "Pro", to: "/pro"}
        ]
        if(this.$auth.user && this.$auth.user.admin) {
          links.push({text: "Admin", to: "/admin/videos"})
        }
        return links;
      },

      authLinks(){
        if(this.$auth.loggedIn){
          return [
            {text: this.$auth.user.email, to: "/user"},
            {text: "Logout", click: () => {this.$auth.logout()}}
          ]
        } else {
          return [
            {text: "Login", to: "/login"},
            {text: "Register", to: "/register"}
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>