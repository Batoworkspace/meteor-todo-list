import { Meteor } from 'meteor/meteor'
import { assert } from 'chai'
import Tasks from '../collections/Tasks.js'
import './methods.js'

if (Meteor.isServer) {
  describe('method: removeTask', function () {
    beforeEach(function () {
      Tasks.remove({})
    })

    it('can remove the task', function () {
      const remTask = Meteor.server.method_handlers['removeTask']

      remTask.apply({}, ['str', {}])

      assert.equal(Tasks.find().count(), 1)
    })
  })
}
