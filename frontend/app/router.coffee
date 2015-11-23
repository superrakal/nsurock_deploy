`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend
  location: config.locationType

Router.map ()->
  @route 'root', path: '/'
  @route 'confirm'
  @route 'queue'

`export default Router`
