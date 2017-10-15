import { Meteor } from 'meteor/meteor';
import { Results } from '../results';

Meteor.publish(
  'results.all', () => Results.find(),
  {
    url: 'api/results',
    httpMethod: 'get',
  },
);
