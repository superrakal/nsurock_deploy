`import Ember from 'ember'`

ConfirmController = Ember.Controller.extend
  isConfirming: false

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



`export default ConfirmController`
