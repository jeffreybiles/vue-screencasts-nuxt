<template>
  <v-app-bar app color="green">
    <!-- Home Page -->
    <nuxt-link to="/">
      <v-img src="https://vue-screencasts-uploads.s3-us-west-2.amazonaws.com/vuescreencasts-logo-small.jpg" 
             to="/" />
    </nuxt-link>

    <v-btn to="/" text>VueScreencasts</v-btn>

    <!-- Desktop menu -->
    <a v-for="link in navLinks"
          :key="link.name"
          :href="link.to" target="_blank">
        <v-btn 
          text
          class="hidden-sm-and-down">
        {{link.text}}
      </v-btn>
    </a>
    <v-spacer />

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
                     text>
          <a :href="link.to" target="_blank">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </a>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  export default {
    computed: {
      navLinks(){
        // let user = this.$auth.user
        let links = [
          {text: "View on YouTube", to: "https://www.youtube.com/playlist?list=PLPwpWyfm6JADRf8x1Jc0Da8R71WJyt-Jn"},
          {text: "Hire Jeffrey", to: "https://www.jeffreybiles.com/consulting"},
        ]
        // if(user && user.admin) {
        //   links.push({text: "Admin", to: "/admin/videos"})
        // }
        return links;
      },

      // authLinks(){
      //   if(this.$auth.loggedIn){
      //     return [
      //       {text: this.$auth.user.email, to: "/account"},
      //       {text: "Logout", click: () => {this.$auth.logout()}}
      //     ]
      //   } else {
      //     return [
      //       {text: "Login/Register", to: "/auth"},
      //     ]
      //   }
      // },

      mobileLinks(){
        return this.navLinks //.concat(this.authLinks)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-image, img {
    border-radius: 50% !important;
    width: 45px;
    margin-right: 5px;
    margin-top: 5px;
    display: inline-block;
  }

  a {
    text-decoration: none;
  }
</style>