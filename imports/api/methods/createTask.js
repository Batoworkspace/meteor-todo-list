import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Tasks from '../collections/Tasks.js'

Meteor.methods({
  'createTask' (title, closed) {
    check(closed, Boolean)
    check(title, String)

    return Tasks.insert({
      title,
      closed,
      createdAt: new Date()
    })
  },
})
