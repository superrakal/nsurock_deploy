`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend()

Router.map ()->
  @route 'root', path: '/'
  @route 'confirm'

`export default Router`
