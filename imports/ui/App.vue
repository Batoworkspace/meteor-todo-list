<template>
  <v-app>
    <to-do-list :content="tasks" />
  </v-app>
</template>

<script>
import ToDoList from './components/ToDoList.vue'
import Tasks from './../api/collections/Tasks'

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

<style>
  body {
    font-family: sans-serif;
    padding: 10px;
  }
</style>
