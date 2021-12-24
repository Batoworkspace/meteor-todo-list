<template>
    <v-row>
        <v-col class="col-1 d-flex align-center">{{ order }}</v-col>
        <v-col class="col-8 d-flex align-center" :class="[{closed: isClosed}]">
            {{ content.title }}
        </v-col>
        <v-col class="col-1 d-flex align-center">
            <v-checkbox
                v-model="status"
                :label="!isClosed ? 'Done' : 'Undone'"
                @change="updateItem(content.uniq, status)"
            />
        </v-col>
        <v-col class="col-2 d-flex align-center">
            <v-btn @click="removeItem(content.uniq)">DELETE</v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ['content', 'order'],

    data () {
        return {
            status: false
        }
    },

    computed: {
        isClosed () {
            return this.content.closed || false
        }
    },

    mounted () {
        this.status = this.isClosed
    },

    methods: {
        removeItem (uniq) {
            this.$emit('removeItem', uniq)
        },

        updateItem (uniq, closed) {
            this.$emit('updateItem', uniq, closed)
        }
    }
}
</script>

<style scoped>
    .closed {
        text-decoration: line-through;
    }
</style>
