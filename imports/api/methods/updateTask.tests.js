import { Meteor } from 'meteor/meteor'
import { assert } from 'chai'
import Tasks from '../collections/Tasks.js'
import './methods.js'

if (Meteor.isServer) {
  describe('method: updateTask', function () {
    beforeEach(function () {
      Tasks.remove({})
    })

    it('can update the task', function () {
      const updTask = Meteor.server.method_handlers['updateTask']

      updTask.apply({}, ['id', 'str', false, {}])

      assert.equal(Tasks.find().count(), 1)
    })
  })
}
