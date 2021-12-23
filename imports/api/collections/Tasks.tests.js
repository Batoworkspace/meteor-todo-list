// Tests for the behavior of the tasks collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import Tasks from './Tasks.js';

if (Meteor.isServer) {
  describe('tasks collection', function () {
    it('insert correctly', function () {
      const taskId = Tasks.insert({
        title: 'Task title',
        closed: false,
      });
      const added = Tasks.find({ _id: taskId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'tasks');
      assert.equal(count, 1);
    });
  });
}
