`import Ember from 'ember'`

SyurupComponentComponent = Ember.Component.extend

  isIn: (->
    isIn = false
    if (@get 'drink_preorder.syurups.currentState.length')
      for i in [0.. (@get 'drink_preorder.syurups.currentState.length')-1]
        if (@get 'syurup.id') == (@get 'drink_preorder.syurups.currentState')[i].id
          isIn = true
    isIn
  ).property('drink_preorder.syurups.length')

  isFull: (->
    (@get('drink_preorder.syurups.length') == 3) && (!@get('isIn'))
  ).property('drink_preorder.syurups.length')


  actions:
    toggleSyurup: ->
      isIn = false
      if (@get 'drink_preorder.syurups.currentState.length')
        for i in [0.. (@get 'drink_preorder.syurups.currentState.length')-1]
          if (@get 'syurup.id') == (@get 'drink_preorder.syurups.currentState')[i].id
            isIn = true
      if isIn
        (@get 'drink_preorder.syurups').removeObject (@get 'syurup')
      else
        (@get 'drink_preorder.syurups').pushObject (@get 'syurup')

`export default SyurupComponentComponent`
