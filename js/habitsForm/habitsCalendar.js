// function to return the current date in dd/mm format

function getFormattedToday() {
  const today = new Date().toLocaleDateString("pt-br").slice(0, 5);

  return today;
}

// function that returns a list of days befor the current date

function getMonthDays(numberOfDays) {
  const today = new Date();
  const previousDays = [];

  for (let i = 0; i < numberOfDays; i++) {
    let day = today.getDate() - i; // returns the current date and subtracts from the value of i (increament at each loop)
    let month = today.getMonth() + 1; // returns the current month
    let year = today.getFullYear(); // returns the current day

    // fires if the current date is less than 1,
    // i.e the day corresponds to a previous month

    if (day < 1) {
      let numberOfDaysInMonth = 0;

      // fire if the value of the last month is equal 1 (january).

      if (month === 1) {
        month = 12; // change the value to 12 (december)
        numberOfDaysInMonth = new Date(year - 1, month, 0).getDate(); // returns the number of days in the month 12 of the previous year

        // fire if month is not 1 (january).
      } else {
        month -= 1; // change the valuye to a previous monthh
        numberOfDaysInMonth = new Date(year, month, 0).getDate(); // returns the number of days in the previus month, current year
      }

      day = numberOfDaysInMonth - i + 1; // change the day value, to earlier day of the prevoius month
    }

    // format the values to match dd/mm

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    previousDays.push(`${day}/${month}`); // add the formatted date to the  previous days array
  }

  return previousDays;
}
//Fred Juma