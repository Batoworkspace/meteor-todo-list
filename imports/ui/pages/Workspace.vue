<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card v-if="!userData" tile flat>
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
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <router-link v-if="!userData.admin" to="/profile">Your Profile</router-link>
                                <router-link v-else to="/admin">Admin Panel</router-link>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <to-do-list v-if="userData" :content="tasks" :username="userData.username" />
    </v-container>
</template>

<script>
import ToDoList from './../components/ToDoList.vue'
import Tasks from './../../api/collections/Tasks'

export default {
    components: {
        ToDoList
    },

    meteor: {
        userData () {
            if (Meteor.user() !== null) {
                if (Meteor.user()) {
                    return {
                        username: Meteor.user().username,
                        admin: Meteor.user().profile.admin
                    }
                }
            }
        },
        $subscribe: {
            'tasks': [],
        },
        tasks () {
            if (Meteor.user() !== null) {
                return Tasks.find({ owner: Meteor.userId() })
            }
        }
    },

    mounted () {
        setTimeout (() => {
            if (!this.userData) {
                this.$router.push('/')
            }
        }, 3000)
    }
}
</script>

<style scoped>
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
