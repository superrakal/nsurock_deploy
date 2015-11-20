`import Ember from 'ember'`

ProfileModalComponent = Ember.Component.extend
  actions:
    sign_out: ->
      Ember.$.ajax
        type: 'DELETE'
        url: "/users/sign_out"
        async: false
        success: =>
          location.replace('/')

`export default ProfileModalComponent`
