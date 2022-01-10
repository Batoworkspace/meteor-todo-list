<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card v-if="isLoggedIn" tile flat>
                    <v-card-title>
                        <h1>{{ userName }}<span>'s Profile</span></h1>
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

export default {
    meteor: {
        isLoggedIn () {
            return Meteor.user() !== null
        },
        userName () {
            return Meteor.user() ? Meteor.user().username : 'Member'
        }
    },

    mounted () {
        if (!this.isLoggedIn) {
            alert('You are currently logged out')

            this.$router.push('/')
        }
    },

    methods: {
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
</style>
