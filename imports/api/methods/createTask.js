import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Tasks from '../collections/Tasks.js'

Meteor.methods({
  'createTask' (owner, uniq, title, closed) {
    check(owner, String)
    check(uniq, String)
    check(closed, Boolean)
    check(title, String)

    return Tasks.insert({
      owner,
      uniq,
      title,
      closed,
      createdAt: new Date()
    })
  }
})
