import Vue from 'vue'
import VueMeteorTracker from 'vue-meteor-tracker'
import Vuex from 'vuex'

Vue.use(VueMeteorTracker)
Vue.use(Vuex)

// This option will apply Object.freeze on the Meteor data to prevent Vue
// from setting up reactivity on it. This can improve the performance of
// Vue when rendering large collection lists for example.
// By default, this option is turned off.
Vue.config.meteor.freeze = true;
