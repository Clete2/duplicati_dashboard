import backupParser from './BackupParser';

const resultTypeRegex = /MainOperation:\s(\w+)/i;

const parseResult = (message: String) => {
  const resultTypeArray = message.match(resultTypeRegex);

  if (resultTypeArray && resultTypeArray.length === 2) {
    const parsedResult = parserFactory(resultTypeArray[1])(message);
    parsedResult.raw = message;

    return parsedResult;
  }

  return new Error('Unknown or empty result');
};

const parserFactory = (resultType: String) => {
  switch (resultType) {
    case 'Backup':
      return backupParser;
    default:
      throw new Error('Unknown type of action.', resultType);
  }
};

export default parseResult;
