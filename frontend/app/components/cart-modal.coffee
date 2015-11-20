`import Ember from 'ember'`

CartModalComponent = Ember.Component.extend
  isConfirmed: false

  drinkPreorderCount: (->
    @get('preorder.drink_preorders.content').length
  ).property('preorder.drink_preorders.content.length')

  foodPreorderCount: (->
    @get('preorder.food_preorders.content').length
  ).property('preorder.food_preorders.content.length')

  size: (->
    @get('preorder.drink_preorders.content').length + @get('preorder.food_preorders.content').length
  ).property('preorder.drink_preorders.content.length', 'preorder.food_preorders.content.length')

  actions:
    confirm: ->
      $('#cart').modal('hide')
      @sendAction('confirm')
    destroyDrink: (drink) ->
      @get('preorder.drink_preorders').removeObject drink
      drink.destroyRecord()
      @get('preorder').save()
    destroyFood: (food) ->
      @get('preorder.food_preorders').removeObject food
      food.destroyRecord()
      @get('preorder').save()


`export default CartModalComponent`
