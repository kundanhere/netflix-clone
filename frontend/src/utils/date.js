/**
 * This function takes a date string as input and returns a formatted date string.
 * If the input date string is not a valid date, it returns 'Invalid Date'.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
