import Vue from 'vue'
import router from './routes'

import '../imports/ui/plugins'

import App from '../imports/ui/App.vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Meteor.subscribe('userList')
Meteor.subscribe('tasks')

Meteor.startup(() => {
  const vuetify = new Vuetify()

  new Vue({
    el: '#app',
    router,
    ...App,
    vuetify
  })
})
