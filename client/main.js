import Vue from 'vue'

import '../imports/ui/plugins'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

import App from '../imports/ui/App.vue'

Meteor.startup(() => {
  const vuetify = new Vuetify()

  new Vue({
    el: '#app',
    ...App,
    vuetify
  })
})
