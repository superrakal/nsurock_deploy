`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  actions:
    confirm: ->
      @transitionToRoute 'confirm'

`export default ApplicationController`
