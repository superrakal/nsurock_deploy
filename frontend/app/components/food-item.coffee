`import Ember from 'ember'`

FoodItemComponent = Ember.Component.extend

  actions:
    add_to_cart: ->
      preorder = (@get 'preorder')
      @get('food_preorder').save().then =>
        @get('preorder.food_preorders').pushObject @get('food_preorder')
        @get('preorder').save().then =>
          @$('#adds').modal('hide')

    choose_food: ->
      food_preorder = @get('store').createRecord('food_preorder')
      food_preorder.set 'food', @get('food')
      @set 'food_preorder', food_preorder
      @$('#adds').modal('show')

    dismiss: ->
      @get('drink_preorder').destroyRecord()
      @$('#adds').modal('hide')

`export default FoodItemComponent`
