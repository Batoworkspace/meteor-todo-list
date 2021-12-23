<template>
    <v-row>
        <v-col class="col-1 d-flex align-center">{{ order }}</v-col>
        <v-col class="col-8 d-flex align-center" :class="[{closed: isClosed}]">
            {{ content.title }}
        </v-col>
        <v-col class="col-1 d-flex align-center">
            <v-checkbox :label="!isClosed ? 'Done' : 'Undone'" />
        </v-col>
        <v-col class="col-2 d-flex align-center">
            <v-btn>DELETE</v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ['content', 'order'],

    computed: {
        isClosed () {
            return false
        }
    }
}
</script>

<style scoped>
    .closed {
        text-decoration: line-through;
    }
</style>
