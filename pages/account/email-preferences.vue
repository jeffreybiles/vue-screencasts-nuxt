<template>
  <div>
    <div class="display-2 mt-3 mb-3">Your email preferences</div>

    <v-list>
      <v-list-item v-for="list in newsletters" :key="list.id">
        <v-list-item-icon>
          <v-switch v-model="list.isSubscribed" color="green" @change="changeSubscription(list)" />
        </v-list-item-icon>
        <v-list-item-content>
          <strong class="headline">{{list.name}}</strong>
          {{list.description}}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
  import emailListJson from '@/utils/email-lists.json';
  import _ from 'lodash';

  export default {
    middleware: 'auth-guard',
    async asyncData({$axios}){
      let result = await $axios.get('/email_preferences/status')

      return {
        contact: result.data.contact,
        raw_newsletters: _.filter(emailListJson.emailLists, e => e.id != 7)
      }
    },
    computed: {
      subscribed_newsletters(){
        return this.contact && this.contact.listIds || [];
      },
      newsletters(){
        return this.raw_newsletters.map(n => {return {...n, isSubscribed: this.subscribed_newsletters.includes(n.id)}})
      }
    },
    methods: {
      async changeSubscription(list){
        let response = await this.$axios.post('/email_preferences/change_subscription', list);
        this.$store.dispatch('snackbar/setSnackbar', {text: `You have been ${list.isSubscribed ? 'subscribed to' : 'unsubscribed from'} ${list.name}`})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
