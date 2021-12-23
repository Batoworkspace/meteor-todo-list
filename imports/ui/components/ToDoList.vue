<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card tile flat>
                    <v-card-title>Bato ToDo List</v-card-title>
                    <v-card-text>
                        <v-container>
                            <div v-if="!content || content.length === 0">Here is no any tasks added</div>
                            <content-item
                                v-for="(item, index) in prepared"
                                :key="index"
                                :content="item"
                                :order="index + 1"
                            />
                        </v-container>
                        <v-form valid="true" v-model="isFormValid">
                            <v-text-field v-model="title" label="Add new item" :rules="[v => !!v && v.length > 3]" />
                            <v-btn :disabled="!isFormValid" type="submit" @click="submit($event)">Submit</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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
    computed: {
        prepared () {
            return this.content || []
        }
    },
    methods: {
        submit (event) {
            event.preventDefault()
            Meteor.call('createTask', this.title, this.closed, (error) => {
                if (error) {
                    console.log(error.error)
                } else {
                    this.title = ''
                    this.closed = false
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
