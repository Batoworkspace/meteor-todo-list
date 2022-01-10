<template>
    <v-container>
        <v-row>
            <v-col>
                <v-btn @click="switchToSignUp">Sign Up</v-btn>
                <v-btn @click="switchToLogin">Login</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card tile flat v-if="isSignUp">
                    <v-card-title>Sign Up</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <v-form valid="true" v-model="isSignUpValid">
                                    <v-text-field v-model="signUpForm.username" :rules="[v => !!v]" :label="'Create your username'" />
                                    <v-text-field type="password" v-model="signUpForm.password" :rules="[v => !!v && v.length >= 8]" :label="'Create the password'" />
                                    <v-btn :disabled="!isSignUpValid" type="submit" @click="signUp($event)">Create an account</v-btn>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card tile flat v-if="isLogin">
                    <v-card-title>Login</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <v-form valid="true" v-model="isLoginValid">
                                    <v-text-field v-model="loginForm.username" :rules="[v => !!v]" :label="'Enter your username'" />
                                    <v-text-field type="password" v-model="loginForm.password" :rules="[v => !!v && v.length >= 8]" :label="'Enter your password'" />
                                    <v-btn :disabled="!isLoginValid" type="submit" @click="login($event)">Login to account</v-btn>
                                </v-form>
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
    data () {
        return {
            isSignUp: false,
            isLogin: false,

            isSignUpValid: false,
            isLoginValid: false,

            signUpForm: {
                username: '',
                password: ''
            },
            loginForm: {
                username: '',
                password: ''
            }
        }
    },

    meteor: {
        isLoggedIn () {
            return Meteor.user() !== null
        }
    },

    mounted () {
        if (this.isLoggedIn) {
            this.$router.push('/profile')
        }
    },

    methods: {
        switchToSignUp () {
            this.isSignUp = true
            this.isLogin = false
        },
        switchToLogin () {
            this.isSignUp = false
            this.isLogin = true
        },

        signUp (event) {
            event.preventDefault()

            AuthMethods.registerUser(this.signUpForm).then(() => {
                alert(`Account for ${this.signUpForm.username} has been successfully created`)

                this.switchToLogin()
                this.loginForm.username = this.signUpForm.username
            }).catch(error => {
                alert(error.reason)
            })
        },
        login (event) {
            event.preventDefault()

            AuthMethods.acceptUser(this.loginForm).then(() => {
                alert(`Logged as ${this.loginForm.username}`)

                this.$router.push('profile')
            }).catch(error => {
                alert(error.reason)
            })
        }
    }
}
</script>
