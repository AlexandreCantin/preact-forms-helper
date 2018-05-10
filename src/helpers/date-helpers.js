export const toSimpleDate = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Convert to yyyy-MM-dd
}

export const isValidDate = (dateStr) => !isNaN(Date.parse(dateStr));

export const getToday = () => toSimpleDate()