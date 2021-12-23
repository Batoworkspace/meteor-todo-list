import { Meteor } from 'meteor/meteor'
import Tasks from './collections/Tasks.js'

Meteor.startup(() => {
  // if the Tasks collection is empty
  if (Tasks.find().count() === 0) {
    const data = []

    data.forEach(task => Tasks.insert(task))
  }
})
