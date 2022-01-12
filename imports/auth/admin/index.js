import { Meteor } from 'meteor/meteor'
import Tasks from '../../api/collections/Tasks'

export default AdminMethods = {
    getAllUsers: () => {
        try {
            if (Meteor.users) {
                return Meteor.users.find({}).fetch()
            }
        } catch (error) {
            console.log(error)
        }
    },
    getUserTasks: (id) => {
        try {
            if (Meteor.users) {
                return Tasks.find({ owner: id }).fetch()
            }
        } catch (error) {
            console.log(error)
        }
    }
}
