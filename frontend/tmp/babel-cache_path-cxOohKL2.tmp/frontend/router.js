import Ember from 'ember';
import config from './config/environment';
var Router;

Router = Ember.Router.extend();

Router.map(function () {
  return this.route('root', {
    path: '/'
  });
});

export default Router;