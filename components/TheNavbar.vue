<template>
  <v-app-bar app color="green lighten-3">
    <!-- Home Page -->
    <v-btn to="/" text>VueScreencasts</v-btn>

    <!-- Desktop menu -->
    <v-btn v-for="link in navLinks"
          :key="link.name"
          text 
          :to="link.to"
          class="hidden-sm-and-down">
      {{link.text}}
    </v-btn>
    <v-spacer />
    <v-btn v-for="link in authLinks"
          :key="link.name"
          text
          right
          :to="link.to"
          class="hidden-sm-and-down"
          @click="link.click ? link.click() : null">
      {{link.text}}
    </v-btn>

    <!-- Mobile menu -->
    <v-menu>
      <template #activator="{on}">
        <v-btn
          icon
          v-on="on"
          class="hidden-md-and-up"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="link in mobileLinks" 
                     :key="link.text"
                     :to="link.to"
                     text
                     @click="link.click ? link.click() : null">
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  export default {
    computed: {
      navLinks(){
        let user = this.$auth.user
        let links = [
          {text: "Videos", to: "/videos"},
          {text: "Courses", to: "/courses"},
        ]
        if(!user || !user.pro || user.subscription_cancelled) {
          links.push({text: "Pro", to: "/pro"})
        }
        if(user && user.admin) {
          links.push({text: "Admin", to: "/admin/videos"})
        }
        return links;
      },

      authLinks(){
        if(this.$auth.loggedIn){
          return [
            {text: this.$auth.user.email, to: "/account"},
            {text: "Logout", click: () => {this.$auth.logout()}}
          ]
        } else {
          return [
            {text: "Login", to: "/login"},
            {text: "Register", to: "/register"}
          ]
        }
      },

      mobileLinks(){
        return this.navLinks.concat(this.authLinks)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>