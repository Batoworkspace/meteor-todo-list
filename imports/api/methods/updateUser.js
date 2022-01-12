import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.methods({
  'updateUserRights' (id) {
    check(id, String)

    if (Meteor.users.find({ _id: id }).fetch()[0].profile.admin) {
        console.log('You can\'t permit this account')
    }

    return Meteor.users.update({ _id: id }, {
        $set: {
            profile: {
                admin: true
            }
        }
    })
  }
})
