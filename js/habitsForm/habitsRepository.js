// activates if key "userHabits" is not already defined and sets an initial value of "[]" for it

if (localStorage.getItem("userHabits") === null) {
	localStorage.setItem("userHabits", "[]");
}

// funtion that returns habit by the user, saved in the browser's local storage

function getHabits() {
	const userHabits = JSON.parse(localStorage.getItem("userHabits"));
	return userHabits;
}

// function that adds a new habit to the array of habits created by user

function addHabit(habit) {
	const userHabits = getHabits();

	// fire if the user tries to create a habit with the same name as an existing one

	if (
		userHabits.find(userHabit => userHabit.name === habit.name) !==
		undefined
	) {
		throw new Error("❌ You already created a habit with that name!");
	}

	// add a habit object to the arry of user-created habits

	userHabits.push({
		id: userHabits.length + 1,
		icon: habit.icon,
		name: habit.name,
		checkedDays: [],
	});

	// updates data within the browser local storage

	localStorage.setItem("userHabits", JSON.stringify(userHabits));

	renderLayout();
}

// function that removes habit from the array of habits created by user

function removeHabit(habitId) {
	const userHabits = getHabits();

	// remove browser local storage habit

	const filteredUserHabits = userHabits.filter(habit => habit.id !== habitId);

	localStorage.setItem("userHabits", JSON.stringify(filteredUserHabits));

  renderLayout();
}

// function that adds a new day when a habitt is done

function addCheckedDay(habitId, day) {
	const userHabits = getHabits();

	// add the date to the marked days

	userHabits[habitId - 1].checkedDays.push(day);

	// update the data within the browser local storage

	localStorage.setItem("userHabits", JSON.stringify(userHabits));
}
//Fred Juma