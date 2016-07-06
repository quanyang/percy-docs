import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('docs', {path: '/docs'}, function() {
    this.route('page', {path: '*path'});
  });
});

export default Router;
