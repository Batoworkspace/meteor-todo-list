import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.methods({
  'removeUser' (id) {
    check(id, String)

    if (Meteor.userId() === id) {
        console.log('You can\'t delete your own account')
    } else {
        if (Meteor.users.find({ _id: id }).fetch()[0].profile.admin) {
            console.log('You can\'t delete an admin account')
        }

        return Meteor.users.remove(id)
    }
  }
})
