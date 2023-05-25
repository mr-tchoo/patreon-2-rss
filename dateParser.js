function parseDateTime(dateTimeString) {
  // Check for 'X hours ago' or 'X days ago' format
  const agoRegex = /^(\d+)\s+(hours|days)\s+ago.*$/;
  const agoMatch = dateTimeString.match(agoRegex);

  if (agoMatch) {

    const durationValue = parseInt(agoMatch[1]);
    const durationUnit = agoMatch[2];

    if (durationUnit === 'hours') {
      const pastDateTime = new Date();
      pastDateTime.setHours(pastDateTime.getHours() - durationValue);
      return pastDateTime;
    } else if (durationUnit === 'days') {
      const pastDateTime = new Date();
      pastDateTime.setDate(pastDateTime.getDate() - durationValue);
      return pastDateTime;
    }
  }

  // Check for 'yesterday at HH:MM' format
  if (dateTimeString.toLowerCase().startsWith('yesterday')) {
    const timeRegex = /(\d{2}):(\d{2})$/;
    const timeMatch = dateTimeString.match(timeRegex);

    if (timeMatch) {
      const currentDate = new Date();
      const pastDate = new Date(currentDate);
      pastDate.setDate(currentDate.getDate() - 1);
      pastDate.setHours(parseInt(timeMatch[1]));
      pastDate.setMinutes(parseInt(timeMatch[2]));
      return pastDate;
    }
  }

  // Check for 'DD MMMM at HH:MM' format
  const dateTimeRegex = /^(\d+)\s+(\w+)\s+at\s+(\d{2}):(\d{2})$/;
  const dateTimeMatch = dateTimeString.match(dateTimeRegex);

  if (dateTimeMatch) {
    const day = parseInt(dateTimeMatch[1]);
    const month = getFullMonthNumber(dateTimeMatch[2]);
    const hours = parseInt(dateTimeMatch[3]);
    const minutes = parseInt(dateTimeMatch[4]);
    const currentYear = new Date().getFullYear();

    const pastDateTime = new Date(currentYear, month, day, hours, minutes);
    return pastDateTime;
  }

  // Check for 'DD MMM YYYY at HH:MM' format
  const extendedDateTimeRegex = /^(\d+)\s+(\w+)\s+(\d+)\s+at\s+(\d{2}):(\d{2})$/;
  const extendedDateTimeMatch = dateTimeString.match(extendedDateTimeRegex);

  if (extendedDateTimeMatch) {
    const day = parseInt(extendedDateTimeMatch[1]);
    const month = getShortMonthNumber(extendedDateTimeMatch[2]);
    const year = parseInt(extendedDateTimeMatch[3]);
    const hours = parseInt(extendedDateTimeMatch[4]);
    const minutes = parseInt(extendedDateTimeMatch[5]);

    const pastDateTime = new Date(year, month, day, hours, minutes);
    return pastDateTime;
  }

  // Default: Unable to parse datetime string
  throw new Error('Unable to parse datetime');
}

function getFullMonthNumber(monthName) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return months.findIndex(month => month === monthName);
}

function getShortMonthNumber(monthName) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];

  return months.findIndex(month => month === monthName);
}

function formatDateTime(dateTime) {
  dateTime.setHours(0,0,0,0);
  const isoDateTimeString = dateTime.toISOString();
  return isoDateTimeString;
}

function main(dateTimeString) {
  
    const parsedDateTime = parseDateTime(dateTimeString);
    const formattedDateTime = formatDateTime(parsedDateTime);
    
    // console.log(`Parsed: ${dateTimeString} to ${formattedDateTime}`);
    return formattedDateTime;
}

module.exports = main;