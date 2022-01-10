import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

export default AuthMethods = {
    registerUser: (data) => {
        return new Promise ((resolve, reject) => {
            Accounts.createUser(data, (error) => {
                if (error) {
                    reject(error)
                }

                resolve()
            })
        })
    },
    acceptUser: (data) => {
        return new Promise ((resolve, reject) => {
            Meteor.loginWithPassword({ username: data.username }, data.password, (error) => {
                if (error) {
                    reject(error)
                }

                resolve()
            })
        })
    },
    logoutUser: () => {
        return new Promise ((resolve, reject) => {
            Meteor.logout((error) => {
                if (error) {
                    reject(error)
                }

                resolve()
            })
        })
    }
}
