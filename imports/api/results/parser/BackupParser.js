import castProperly from './cast';

// e.g. Messages: [One,\nTwo]
const arrayRegex = /\w+: \[[\s\S]*?\]/ig;

const backupParser = (message) => {
  console.info(`Got message: ${JSON.stringify(message)}`);
  let result = {};

  parseArrays(message).forEach((array) => {
    result = Object.assign(result, array);
  });

  // Remove the arrays section of the message and split on lines
  const lines = message.replace(arrayRegex).split('\n');
  const firstLine = lines.shift();

  result = Object.assign(result, parseFirstLine(firstLine));

  lines.forEach((line) => {
    const splitLine = line.split(': ');

    if (splitLine.length !== 2) {
      return;
    }

    const fieldName = splitLine[0];
    const fieldValue = splitLine[1];

    const fieldObject = {};
    fieldObject[fieldName] = castProperly(fieldValue);

    result = Object.assign(result, fieldObject);
  });

  return result;
};

const parseFirstLine = (firstLine: String) => { // Example: Duplicati Backup report for My MacBook Pro
  const words = firstLine.split(' ');

  const type = words[1];

  const forIndex = words.indexOf('for');
  const computerName = words.splice(forIndex + 1).join(' ');

  return { type, computerName };
};

const parseArrays = (message: String) => {
  const matches = message.match(arrayRegex);

  if (matches) {
    const arrays = [];

    matches.forEach((match) => {
      const colonIndex = match.indexOf(':');
      const label = match.substring(0, colonIndex);
      const value = match.substring(colonIndex + 1).trim();

      arrays.push({ [label]: value });
    });

    return arrays;
  }

  return [];
};

export default backupParser;
