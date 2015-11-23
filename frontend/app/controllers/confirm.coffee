`import Ember from 'ember'`

ConfirmController = Ember.Controller.extend
  isConfirming: false
  socketIOService: Ember.inject.service('socket-io')

  init: ->
    @_super.apply(this, arguments)
    @socket = this.get('socketIOService').socketFor('http://nsurock.ru:6969/')

  actions:
    confirm: ->
      $('#confirmed').on 'hidden.bs.modal', (e) ->
        location.replace('/')
      @set 'isConfirming', true
      @model.save().then =>
        Ember.$.ajax
          type: 'GET'
          url: "/api/v1/preorders/new?id=" + @model.id
          async: false
          success: =>
            cookie.remove('preorder_id')
            $('#confirmed').modal('show')
            @socket.emit('preorder added')



`export default ConfirmController`
