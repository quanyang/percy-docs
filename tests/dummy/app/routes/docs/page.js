import Ember from 'ember';
import markdownFiles from 'percy-docs/markdownFiles';

export default Ember.Route.extend({
  model(params) {
    return Ember.get(markdownFiles, params.path.replace(/\//g, '.')) || null;
  }
});
