`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  actions:
    confirm: ->
      @transitionToRoute 'confirm'
    openProfileModal: ->
      $('#profileModal').modal('show')


`export default ApplicationController`
