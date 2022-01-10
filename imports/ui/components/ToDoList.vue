<template>
    <v-row>
        <v-col>
            <v-card tile flat>
                <v-card-title>Bato ToDo List</v-card-title>
                <v-card-text>
                    <v-row v-if="!prepared || prepared.length === 0">
                        <v-col>
                            Here is no any tasks added
                        </v-col>
                    </v-row>
                    <content-item
                        v-for="(item, index) in prepared"
                        :key="item.uniq"
                        :content="item"
                        :order="index + 1"
                        @removeItem="remove"
                        @updateItem="update"
                    />
                    <v-form valid="true" v-model="isFormValid">
                        <v-text-field v-model="title" label="Add new item" :rules="[v => !!v && v.length > 3]" />
                        <v-btn :disabled="!isFormValid" type="submit" @click="submit($event)">Submit</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import ContentItem from './ContentItem.vue'

export default {
    props: ['content'],
    components: {
        ContentItem
    },
    data () {
        return {
            isFormValid: false,
            title: '',
            closed: false
        }
    },
    meteor: {
        owner () {
            if (Meteor.user() !== null) {
                return Meteor.userId()
            }
        }
    },
    computed: {
        prepared () {
            return this.content || []
        }
    },
    methods: {
        submit (event) {
            event.preventDefault()

            const uniq = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

            Meteor.call('createTask', this.owner, uniq, this.title, this.closed, (error) => {
                if (error) {
                    console.log(error.error)
                } else {
                    this.title = ''
                    this.closed = false
                }
            })
        },

        remove (uniq) {
            Meteor.call('removeTask', this.owner, uniq, (error) => {
                if (error) {
                    console.log(error.error)
                }
            })
        },

        update (uniq, closed) {
            Meteor.call('updateTask', this.owner, uniq, closed, (error) => {
                if (error) {
                    console.log(error.error)
                }
            })
        }
    }
}
</script>
