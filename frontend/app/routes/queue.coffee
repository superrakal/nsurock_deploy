`import Ember from 'ember'`

QueueRoute = Ember.Route.extend

  beforeModel: ->
    @store.findAll('drink')
    @store.findAll('syurup')
    @store.findAll('food')
    @store.findAll('sauce')

  model: ->
    @store.find('preorder')

  setupController: (controller, model) ->
    controller.set 'model', model.filterBy('status', 'Изготовляется')

  actions:
    socket_event: ->
      location.replace('/queue')

`export default QueueRoute`
