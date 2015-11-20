`import Ember from 'ember'`

DrinkItemComponent = Ember.Component.extend

  isMoreThanOneSyurup: (->
    @get('drink_preorder.syurups.length') > 1
  ).property('drink_preorder.syurups.length')

  actions:
    add_to_cart: ->
      preorder = (@get 'preorder')
      @get('drink_preorder').save().then =>
        @get('preorder.drink_preorders').pushObject @get('drink_preorder')
        @get('preorder').save().then =>
          @$('#adds').modal('hide')

    choose_drink: ->
      drink_preorder = @get('store').createRecord('drink_preorder')
      drink_preorder.set 'drink', @get('drink')
      @set 'drink_preorder', drink_preorder
      @$('#adds').modal('show')

    dismiss: ->
      @get('drink_preorder').destroyRecord()
      @$('#adds').modal('hide')


`export default DrinkItemComponent`
