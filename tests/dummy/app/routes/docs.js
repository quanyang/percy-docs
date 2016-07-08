import Ember from 'ember';
import percyDocs from 'percy-docs';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      navMarkdown: Ember.get(percyDocs.markdownFiles, 'nav'),
      pageMarkdown: Ember.get(percyDocs.markdownFiles, 'index'),
    });
  }
});
