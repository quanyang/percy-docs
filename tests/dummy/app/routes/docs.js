import Ember from 'ember';
import markdownFiles from 'percy-docs/markdownFiles';

export default Ember.Route.extend({
  model() {
    return Ember.get(markdownFiles, 'index') || null;
  }
});
