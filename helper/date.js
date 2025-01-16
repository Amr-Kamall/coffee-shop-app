export default function formatDateToday() {
  // Get the current date and time
  const now = new Date();

  // Extract day, month, hours, and minutes
  const day = now.getDate();
  const month = now.toLocaleString('default', {month: 'long'}); // Full month name
  const hours = now.getHours().toString().padStart(2, '0'); // Pad hours to 2 digits
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Pad minutes to 2 digits

  // Add ordinal suffix to the day
  const getOrdinal = n => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  // Format the date dynamically
  return `${day}${getOrdinal(day)} ${month} ${hours}:${minutes}`;
}

