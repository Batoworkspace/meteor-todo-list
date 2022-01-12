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
        <v-row>
            <v-col>
                <v-card v-if="userData" tile flat>
                    <v-card-title>
                        <h1>{{ userData.username }}<span>'s Profile</span></h1>
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
        userData () {
            if (Meteor.user() !== null) {
                if (Meteor.user()) {
                    if (Meteor.user().profile.admin) {
                        this.$router.push('/admin')
                    }

                    return {
                        username: Meteor.user().username
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
