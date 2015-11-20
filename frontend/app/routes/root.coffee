`import Ember from 'ember'`

RootRoute = Ember.Route.extend
  activate: ->
    Ember.run.later(( ->
      height = ($(window).height() - $('.navbar').height()-1) / $('.panel:visible').length
      $('.panel section').height(height)
      $('.logo').height(height)
      $(window).resize ->
        height = ($(window).height() - $('.navbar').height()-1) / $('.panel:visible').length
        $('.panel section').height(height)
        $('.logo').height(height)
    ), 10)

  beforeModel: ->
    @store.findAll('drink')
    @store.findAll('syurup')
    @store.findAll('food')
    @store.findAll('sauce')

  model: ->
    id = cookie.get('preorder_id')
    if id != undefined
      @store.find('preorder', id)
    else
      @store.createRecord('preorder')

  setupController: (controller, model) ->
    controller.set 'drinks',  @store.peekAll('drink')
    controller.set 'syurups', @store.peekAll('syurup')
    controller.set 'foods',   @store.peekAll('food')
    controller.set 'sauces',  @store.peekAll('sauce')
    controller.set 'preorder', model

`export default RootRoute`
