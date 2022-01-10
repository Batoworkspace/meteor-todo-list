<template>
    <v-container>
        <v-row>
            <v-col>
                <router-link to="/profile">Your Profile</router-link>
            </v-col>
        </v-row>
        <to-do-list v-if="isLoggedIn" :content="tasks" />
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
        isLoggedIn () {
            return Meteor.user() !== null
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
        if (!this.isLoggedIn) {
            alert('You are currently logged out')

            this.$router.push('/')
        }
    }
}
</script>
