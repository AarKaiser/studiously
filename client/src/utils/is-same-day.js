const isSameDay = (firstDate, secondDate) => {
  const year1 = firstDate.getFullYear();
  const year2 = secondDate.getFullYear();

  const month1 = firstDate.getMonth();
  const month2 = secondDate.getMonth();

  const day1 = firstDate.getDate();
  const day2 = secondDate.getDate();

  const firstDateStr = `${year1}-${month1}-${day1}`;
  const secondDateStr = `${year2}-${month2}-${day2}`;

  return firstDateStr === secondDateStr;
};

export default isSameDay;
