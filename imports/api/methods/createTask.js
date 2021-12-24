import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Tasks from '../collections/Tasks.js'

Meteor.methods({
  'createTask' (uniq, title, closed) {
    check(uniq, String)
    check(closed, Boolean)
    check(title, String)

    return Tasks.insert({
      uniq,
      title,
      closed,
      createdAt: new Date()
    })
  }
})
