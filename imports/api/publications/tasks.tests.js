import { assert } from 'chai'
import { PublicationCollector } from 'meteor/johanbrook:publication-collector'
import Tasks from '../collections/Tasks.js'
import './publications.js'

describe('Publish tasks', function () {
  beforeEach(function () {
    Tasks.remove({})
    Tasks.insert({
      title: 'Task title',
      closed: false
    })
  })

  it('sends all tasks', function (done) {
    const collector = new PublicationCollector()
    collector.collect('tasks', (collections) => {
      assert.equal(collections.tasks.length, 1)
      done()
    })
  })
})
