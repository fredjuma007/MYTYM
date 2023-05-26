// handlers: will handles DOM: Document Object Model

// handle click on delete habit icon

function removeHabitHandler(element) {
  const habitId = Number(
    element.parentElement.parentElement.getAttribute("data-habit-id")
  );

  removeHabit(habitId);
}

// handle clicks on checkboxes within the calender

function addCheckedDayHandler(element, day) {
  const habitId = Number(element.getAttribute("data-habit-id"));

  addCheckedDay(habitId, day);
}

// renders: will change the DOM according to changes in the state of the  user's habits

// toggle habit details visibilty

function toggleHabitsDetails(habitElement) {
  const habitIconElement = habitElement.children[0];
  const habitDetailsElement = habitElement.children[1];

  if (
    habitDetailsElement.style.display === "none" ||
    habitDetailsElement.style.display === ""
  ) {
    habitDetailsElement.style.display = "flex";
    habitIconElement.classList.add("habit-icon-relative");
  } else if (habitDetailsElement.style.display === "flex") {
    habitDetailsElement.style.display = "none";
    habitIconElement.classList.remove("habit-icon-relative");
  }
}

// renders the list of habits

function renderHabits() {
  const userHabits = getHabits();
  const habits = document.querySelector("#habits");

  habits.innerHTML = "";

  // go through each habit saved by the user and add the relevant HTML elements to it

  userHabits.forEach((habit) => {
    // check to avoid creating multiple habits

    if (
      document.querySelectorAll(`span[data-habit-id="${habit.id}"]`).length ===
      0
    ) {
      // inserts the habit HTML code into the habits list

      habits.insertAdjacentHTML(
        "beforeend",
        `
        <div
          class="habit"
          data-habit-id="${habit.id}"
        >
          <span
            onclick=toggleHabitsDetails(this.parentElement)
            class="habit-icon material-symbols-outlined"
          >
            ${habit.icon}
          </span>

          <div class="habit-details">
            <p>${habit.name}</p>
            <span
              class="material-symbols-outlined"
              onclick=removeHabitHandler(this)
            >
              delete
            </span>
          </div>
        </div>
        `
      );
    }
  });
}

// render the habit calender

function renderCalendar() {
  const userHabits = getHabits();
  const calendar = document.querySelector("#calendar");

  calendar.innerHTML = "";

  const monthDays = getMonthDays(30); // returns a list of the last 30 days

  monthDays.forEach((day) => {
    // triggers if the numbr of the days in the calender is not equal to the number of days in the current month

    if (calendar.children.length !== monthDays.length) {
      calendar.insertAdjacentHTML(
        "beforeend",
        `
        <div data-day=${day} class="day">
          <p>${day}</p>
        </div>
        `
      );
    }

    // go through the habit saved by the user and return a list of checkboxes related to it

    const checkboxes = userHabits.map((habit) => {
      // verify to avoid creating duplicate of checkboxes

      if (
        document.querySelectorAll(
          `#calendar div[data-day="${day}"] input[data-habit-id="${habit.id}"]`
        ).length === 0
      ) {
        const isChecked = habit.checkedDays.includes(day); // returns a true value if the checkbox is checked
        const isDisabled = day !== getFormattedToday(); // returns a true value if the checkbox does not match the current day

        return `
          <input
            data-habit-id="${habit.id}"
            onclick=addCheckedDayHandler(this,"${day}")
            type="checkbox"
            ${isChecked ? "checked" : ""}
            ${isDisabled ? "disabled" : ""}
          />
        `;
      }
    });

    // add new checkbox to the curent day

    const currentDay = document.querySelector(
      `#calendar div[data-day="${day}"]`
    );

    currentDay.insertAdjacentHTML("beforeend", `${checkboxes.join("")}`);
  });
}

// render the entire habit form layout

function renderLayout() {
  const userHabits = getHabits();

  const todayElement = document.querySelector("#today span");
  const welcomeMessage = document.querySelector("#welcome-message");
  const habitsForm = document.querySelector("#habits-form");

  todayElement.innerText = getFormattedToday();

  // triggers if user has no habits

  if (userHabits.length === 0) {
    welcomeMessage.style.display = "flex"; // Displays welcome message
    habitsForm.style.display = "none"; // hide the habit form

    return;
  }

  welcomeMessage.style.display = "none"; // hide welcome message

  // renders the habit list and habit calendar

  renderHabits();
  renderCalendar();

  habitsForm.style.display = "flex"; // shoe the habit form
}

// do the first rendering of the habit

renderLayout();
//Fred Juma