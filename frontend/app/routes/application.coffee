`import Ember from 'ember'`

ApplicationRoute = Ember.Route.extend

  model: ->
    id = cookie.get('preorder_id')
    if id != undefined
      @store.find('preorder', id)
    else
      @store.createRecord('preorder')

  afterModel: (model) ->
    model.save().then ->
      cookie.remove('preorder_id')
      cookie.set('preorder_id', model.get('id'))

  setupController: (controller, model) ->
    controller.set 'currentUser', @get 'session.currentUser'
    controller.set 'preorder', model

`export default ApplicationRoute`
