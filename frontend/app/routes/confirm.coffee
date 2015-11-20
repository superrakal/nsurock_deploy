`import Ember from 'ember'`

ConfirmRoute = Ember.Route.extend

  beforeModel: ->
    @store.findAll('drink')
    @store.findAll('syurup')
    @store.findAll('food')
    @store.findAll('sauce')

  model: ->
    id = cookie.get('preorder_id')
    @store.find('preorder', id)

  afterModel: (model) ->
    model.reload()

  setupController: (controller, model) ->
    controller.set 'model', model

`export default ConfirmRoute`
