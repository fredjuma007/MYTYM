// sets user's prefered language

function setUserLangPreference(languageTag) {
	localStorage.setItem("lang", languageTag);
}

// returns a list of available languages

async function getAvailableLangs() {
	let availableLangs = [];

	const listOfAvailableLangs = await (
		await fetch(
			"https://raw.githubusercontent.com/cardtunic/habits/main/assets/repos/langs/availableLangs.json"
		)
	).json();

	const currentLang = getCurrentLangTag(listOfAvailableLangs);

	for (let langTag of listOfAvailableLangs) {
		let lang = await (
			await fetch(
				`https://raw.githubusercontent.com/cardtunic/habits/main/assets/repos/langs/${langTag}.json`
			)
		).json();

		lang.tag = langTag;

		if (currentLang === langTag) {
			lang.selected = true;
		}

		availableLangs.push(lang);
	}

	return availableLangs;
}

// returns the users's preferred language

function getCurrentLangTag(listOfAvailableLangs) {
	const userLanguagePreference = localStorage.getItem("lang");

	let currentLang = userLanguagePreference || navigator.language;
	// sets the page language code based on the users's preference, onlyt if it's already set
	// esle, get the user's browser language

	// fire if the language doesn't match any of the available

	if (!listOfAvailableLangs.includes(currentLang)) {
		// triggers if the user's language does not comply with the pattern: "country-language" (example.: pt-BR)

		if (currentLang.length === 2) {
			currentLang = listOfAvailableLangs.filter(lang =>
				lang.startsWith(currentLang)
			)[0];

			// sets the default language to english
		} else {
			currentLang = "en-US";
		}
	}

	return currentLang;
}
//Fred Juma