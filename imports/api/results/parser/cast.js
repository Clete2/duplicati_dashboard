import moment from 'moment';

const numberRegex = /^[0-9]+$/;
const booleanRegex = /^false|true$/i;
// MM/DD/YYYY HH:MM:SS AM/PM
const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{1,2}:\d{1,2} (?:AM|PM)/i;
const durationRegex = /\d{1,2}:\d{1,2}:\d{1,2}\.\d+/;

const castProperly = (value: String) => {
  try {
    if (value.match(durationRegex)) {
      // Don't care about the original milliseconds as they are insignificant.
      const [hours, minutes, seconds] = value.split('.')[0].split(':');
      return (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
    }

    if (value.match(dateRegex)) {
      // Assume UTC
      return moment.utc(value, 'MM/DD/YYYY hh:mm:ss a').unix();
    }

    if (value.match(numberRegex) || value.match(booleanRegex)) {
      return JSON.parse(value.toLowerCase());
    }

    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

export default castProperly;
