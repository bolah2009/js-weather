const formatDate = () => {
  const now = new Date();

  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const newDate = date => new Date(date);
  const weekIndex = date => newDate(date).getDay();
  const dayOfTheWeek = date => week[weekIndex(date)];
  const isFuture = date => newDate(date) > now;

  const toTime = (date = now) => {
    const hour = newDate(date).getHours();
    const minutes = newDate(date).getMinutes();
    const timePeriods = hour < 12 ? 'AM' : 'PM';
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formatHour = () => {
      const newHour = hour > 12 ? hour - 12 : hour;
      if (newHour < 12) {
        return `0${newHour}`;
      }
      return newHour;
    };
    return `${formatHour()}:${formatMinutes} ${timePeriods}`;
  };

  const toFullDay = date => dayOfTheWeek(date);
  const toShortDay = (date, take = 3) => dayOfTheWeek(date).slice(0, take);
  const toFullDayWithTime = date => `${dayOfTheWeek(date)} (${toTime(date)})`;

  return {
    toFullDay,
    toShortDay,
    toFullDayWithTime,
    isFuture,
  };
};

export default formatDate;
