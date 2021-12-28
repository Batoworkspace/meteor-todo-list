<template>
    <v-container>
        <to-do-list :content="tasks" />
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
        $subscribe: {
            'tasks': [],
        },
        tasks () {
            return Tasks.find({})
        }
    }
}
</script>
