import { Meteor } from 'meteor/meteor';
import { Results } from './results';
import parseResult from './utils/resultParser';

Meteor.method(
  'results', (data: String) => {
    const parsedResult = parseResult(data.message);

    Results.insert({
      ...parsedResult,
      createdAt: new Date(),
    });
  },
  {
    url: 'api/results',
  },
);
