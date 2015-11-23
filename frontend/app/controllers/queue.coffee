`import Ember from 'ember'`

QueueController = Ember.Controller.extend
  socketIOService: Ember.inject.service('socket-io')

  init: ->
    @_super.apply(this, arguments)
    ion.sound
      sounds: [
        { name: 'bell_ring' }
      ]
      path: '/sounds/'
      preload: true
    @socket = this.get('socketIOService').socketFor('http://nsurock.ru:6969/')
    @socket.on 'update preorders list', =>
      ion.sound.play("bell_ring")
      @send("socket_event")


  actions:
    done: (preorder) ->
      preorder.set 'status', 'Выдан'
      preorder.save().then ->
        location.reload()

    ban: (preorder) ->
      preorder.set 'status', 'Не выдан'
      preorder.save().then ->
        location.reload()

`export default QueueController`
