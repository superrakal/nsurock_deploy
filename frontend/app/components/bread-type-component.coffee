`import Ember from 'ember'`

BreadTypeComponentComponent = Ember.Component.extend

  isSelected: (->
    @get('food.bread_type') == @get('type')
  ).property('food.bread_type')

  actions:
    toggleType: ->
      @set 'food.bread_type', @get('type')

`export default BreadTypeComponentComponent`
