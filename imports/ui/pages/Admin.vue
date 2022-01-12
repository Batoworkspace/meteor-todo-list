<template>
    <v-container>
        <v-row v-if="!userData">
            <v-col>
                <v-card tile flat>
                    <v-card-title>
                        <h1><span>You are currently logged out</span></h1>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col class="d-flex align-center">
                                Now you will be redirected to login page
                                <span class="loader"><span></span></span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="userData">
            <v-col>
                <v-card tile flat>
                    <v-card-title>
                        <h1><span>You have been authorized as</span> {{ userData.username || 'admin' }}</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <router-link to="/workspace">
                                    Go to workspace
                                </router-link>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn v-if="!list.isOpen" @click="showUsers">Show all users</v-btn>
                                <v-btn v-else @click="hideUsers">Hide list</v-btn>
                                <v-list v-if="users.length !== 0 && list.isOpen">
                                    <v-subheader>All users ({{ users.length }})</v-subheader>
                                    <v-list-item-group>
                                        <v-list-item
                                            v-for="(user, index) in users"
                                            :key="user._id || index"
                                        >
                                            <div class="col-md-2 mr-2">{{ index + 1 }}. {{ user.username || 'Member' }}</div>
                                            <div>
                                                <v-btn
                                                    v-if="!user.profile.admin"
                                                    @click="setAdminRights(user._id)"
                                                    class="mx-2"
                                                >Permit admin rights</v-btn>
                                                <v-btn
                                                    v-if="(userData.id !== user._id) && (!user.profile.admin)"
                                                    @click="removeUser(user._id)"
                                                    class="mx-2"
                                                >Remove user's account</v-btn>
                                            </div>
                                            <div v-html="getUserStats(user._id)" />
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn @click="logout">Logout</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AuthMethods from '../../auth/api'
import AdminMethods from '../../auth/admin'

export default {
    data () {
        return {
            users: [],
            list: {
                isOpen: false
            }
        }
    },

    meteor: {
        userData () {
            if (Meteor.user() !== null) {
                if (Meteor.user()) {
                    if (!Meteor.user().profile.admin) {
                        this.$router.push('/profile')
                    }

                    return {
                        username: Meteor.user().username,
                        id: Meteor.user()._id
                    }
                }
            }
        }
    },

    mounted () {
        setTimeout (() => {
            if (!this.userData) {
                this.$router.push('/')
            }
        }, 3000)
    },

    methods: {
        showUsers () {
            const usersList = AdminMethods.getAllUsers()

            this.users = usersList.sort((a, b) => {
                let x = a.username.toLowerCase()
                let y = b.username.toLowerCase()

                if(x > y) { return 1 } 
                if(x < y) { return -1 }
                return 0
            })
            this.list.isOpen = true
        },
        hideUsers () {
            this.users = []
            this.list.isOpen = false
        },

        removeUser (id) {
            if (Meteor.userId() === id) {
                alert('You can\'t delete your own account')
            } else {
                if (Meteor.users.find({ _id: id }).fetch()[0].profile.admin) {
                    alert('You can\'t delete an admin account')
                }

                this.users = []
                this.list.isOpen = false

                Meteor.call('removeUser', id, () => {
                    this.showUsers()
                })
            }
        },
        setAdminRights (id) {
            if (Meteor.users.find({ _id: id }).fetch()[0].profile.admin) {
                alert('You can\'t permit this user')
            }

            this.users = []
            this.list.isOpen = false

            Meteor.call('updateUserRights', id, () => {
                this.showUsers()
            })
        },
        getUserStats (id) {
            const tasks = AdminMethods.getUserTasks(id)
            const amount = tasks.length
            const completed = tasks.filter(task => {
                return task.closed
            }).length

            const result = amount ? 'Completed: ' + Math.round(completed / amount * 100) + '%' : 'No any tasks'
            
            return result
        },

        logout () {
            AuthMethods.logoutUser().then(() => {
                alert(`Logging out...`)

                this.$router.push('/')
            }).catch(error => {
                alert(error.reason)
            })
        }
    }
}
</script>

<style scoped>
    h1 span {
        font-weight: 400;
    }

    @keyframes loader {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .loader {
        animation: loader 0.6s infinite linear;
        margin-left: 16px;
        position: relative;
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-image: linear-gradient(to bottom right, blue, cyan);
    }

    .loader::after {
        content: '';
        display: inline-block;
        width: 24px;
        height: 24px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        top: 3px;
        left: 3px;
    }

    .loader > span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-color: white;
        position: absolute;
        top: 0;
        right: 0;
    }
</style>
