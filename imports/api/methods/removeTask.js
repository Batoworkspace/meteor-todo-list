import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Tasks from '../collections/Tasks.js'

Meteor.methods({
  'removeTask' (uniq) {
    check(uniq, String)

    const record = Tasks.find({uniq: uniq}).fetch()
    const recordId = record[0]._id

    return Tasks.remove(recordId)
  }
})
