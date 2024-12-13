export const formatDate = (date: string | Date, format: string) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (typeof date === "string") {
    if (days.findIndex((day) => date.includes(day)) !== -1) {
      return date;
    }
  }

  const properDate: Date = new Date(date);

  const year = properDate.getFullYear();
  const month = String(properDate.getMonth() + 1).padStart(2, "0");
  const day = String(properDate.getDate()).padStart(2, "0");

  if (format === "YY-MM-DD") {
    return `${year}-${month}-${day}`;
  } else if (format === "DD-MM-YY") {
    return `${day}-${month}-${year}`;
  } else if (format === "MM-DD-YY") {
    return `${month}-${day}-${year}`;
  } else if (format === "DD-MM") {
    return `${day}-${month}`;
  } else if (format === "DD MMM") {
    return `${day} ${months[properDate.getMonth()].slice(0, 3)}`;
  } else if (format === "DD MMM YY") {
    return `${day} ${months[properDate.getMonth()].slice(0, 3)} ${year}`;
  } else if (format === "DD MMMM YY") {
    return `${day} ${months[properDate.getMonth()]} ${year}`;
  } else if (format === "dddd, DD MMM") {
    return `${days[properDate.getDay()]}, ${day} ${months[
      properDate.getMonth()
    ].slice(0, 3)}`;
  } else if (format === "dddd, DD MMM YY") {
    return `${days[properDate.getDay()]}, ${day} ${months[
      properDate.getMonth()
    ].slice(0, 3)} ${year}`;
  } else if (format === "dddd, DD MMMM YY") {
    return `${days[properDate.getDay()]}, ${day} ${
      months[properDate.getMonth()]
    } ${year}`;
  }
};  