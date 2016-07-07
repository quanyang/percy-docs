import Ember from 'ember';
import percyDocs from 'percy-docs';

export default Ember.Route.extend({
  model() {
    return Ember.get(percyDocs.markdownFiles, 'index') || null;
  }
});
