`import Ember from 'ember'`

SauceComponentComponent = Ember.Component.extend

  isSelected: (->
    @get('food.sauce.id') == @get('sauce.id')
  ).property('food.sauce')

  actions:
    toggleSauce: ->
      if @get('food.sauce.id') == @get('sauce.id')
        @set 'food.sauce', null
      else
        @set 'food.sauce', @get('sauce')

`export default SauceComponentComponent`
