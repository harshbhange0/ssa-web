export const getDateAndTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);

  const formattedDate = `${padZero(date.getDate())}/${padZero(date.getMonth() + 1)}/${date.getFullYear()} : ${formatAMPM(date.getHours(), date.getMinutes())}`;

  return formattedDate;
};


function padZero(num:number) {
  return (num < 10 ? "0" : "") + num;
}

function formatAMPM(hours: number, minutes: number) {
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = padZero(minutes);
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

// Example usage:




