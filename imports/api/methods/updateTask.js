import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Tasks from '../collections/Tasks.js'

Meteor.methods({
  'updateTask' (owner, uniq, closed) {
    check(owner, String)
    check(uniq, String)
    check(closed, Boolean)

    const record = Tasks.find({owner: owner, uniq: uniq}).fetch()
    const recordId = record[0]._id

    let closedStatus = false
    if (closed) {
      closedStatus = true
    }

    return Tasks.update(recordId, {
      $set: { closed: closedStatus }
    })
  }
})
