import castProperly from './cast';

it('Parses a timespan into milliseconds correctly', () => {
  expect(castProperly('01:07:03.8850110')).toBe(4023000);
});

it('Can parse durations greater than one day', () => {
  expect(castProperly('57:07:03.8850110')).toBe(205623000);
});

it('Can parse a number', () => {
  expect(castProperly('72')).toBe(72);
});

it('Can parse a large number', () => {
  expect(castProperly('1423758924738942349823297123981')).toBe(1423758924738942349823297123981);
});

it('Ignores strings', () => {
  expect(castProperly('Hello my name is bob')).toBe('Hello my name is bob');
});

it('Parses a normal date', () => {
  expect(castProperly('04/25/2017 04:05:06 AM')).toBe(1493093106);
});

it('Parses a boolean', () => {
  expect(castProperly('TrUE')).toBe(true);
});

it('Parses a lowercase boolean', () => {
  expect(castProperly('true')).toBe(true);
});

it('Parses an uppercase boolean', () => {
  expect(castProperly('TRUE')).toBe(true);
});

it('Parses an false', () => {
  expect(castProperly('FaLSe')).toBe(false);
});

it('Parses a JSON object', () => {
  expect(castProperly('{"Hey": "Bye"}')).toMatchObject({ Hey: 'Bye' });
});

it('Parses a JSON object with nested list', () => {
  expect(castProperly('{"Hey": ["Howdy", "Bye"]}')).toMatchObject({ Hey: ['Howdy', 'Bye'] });
});

it('Parses a JSON array', () => {
  expect(castProperly('[7, 8]')).toMatchObject([7, 8]);
});

it('Parses a nested JSON array', () => {
  expect(castProperly('[7, [8, 8.5]]')).toMatchObject([7, [8, 8.5]]);
});

it('Returns a String for an invalid JSON object', () => {
  expect(castProperly('[7, ')).toBe('[7, ');
});
