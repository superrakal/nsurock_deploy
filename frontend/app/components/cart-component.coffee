`import Ember from 'ember'`

CartComponentComponent = Ember.Component.extend

  size: (->
    @get('preorder.drink_preorders.content').length + @get('preorder.food_preorders.content').length
  ).property('preorder.drink_preorders.content.length', 'preorder.food_preorders.content.length')

  actions:
    showCart: ->
      $('#cart').modal('show')

`export default CartComponentComponent`
