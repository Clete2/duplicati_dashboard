import _ from 'lodash';

const numberRegex = /^[0-9]+$/;
const booleanRegex = /^false|true$/i;

const backupParser = (message) => {
  console.info(`Got message: ${JSON.stringify(message)}`);
  let result = {};

  const lines = message.split('\n');
  const firstLine = lines.shift();

  result = Object.assign(result, parseFirstLine(firstLine));

  lines.forEach((line) => {
    const splitLine = line.split(': ');

    if (splitLine.length !== 2) {
      console.log(`Oops ${splitLine}`);
      return;
    }

    const fieldName = splitLine[0];
    const fieldValue = splitLine[1];

    const fieldObject = {};
    fieldObject[fieldName] = castProperly(fieldValue);

    console.log(`I made an object ${JSON.stringify(fieldObject)}`);

    result = Object.assign(result, fieldObject);
  });

  return result;
};

const parseFirstLine = (firstLine) => { // Example: Duplicati Backup report for My MacBook Pro
  const words = firstLine.split(' ');

  const type = words[1];

  const forIndex = words.indexOf('for');
  const computerName = words.splice(forIndex + 1).join(' ');

  return { type, computerName };
};

const castProperly = (value: String) => {
  try {
    if (value.match(numberRegex) || value.match(booleanRegex)) {
      return JSON.parse(value.toLowerCase());
    }

    return JSON.parse(value);
  } catch (e) {
    console.info('Could not parse String as object', e);
  }

  return value;
};

export default backupParser;
