import { Meteor } from 'meteor/meteor'
import { assert } from 'chai'
import Tasks from '../collections/Tasks.js'
import './methods.js'

if (Meteor.isServer) {
  describe('method: createTask', function () {
    beforeEach(function () {
      Tasks.remove({})
    })

    it('can add a new task', function () {
      const addTask = Meteor.server.method_handlers['createTask']

      addTask.apply({}, ['id','str', 'title', false, {}])

      assert.equal(Tasks.find().count(), 1)
    })
  })
}
