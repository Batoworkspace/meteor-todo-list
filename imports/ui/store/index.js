import user, { plugin as UserPlugin } from '../auth/store'

export default {
  plugins: [UserPlugin], // Connects Meteor's reactive user state to the store using Tracker

  modules: {
    user
  }
}
