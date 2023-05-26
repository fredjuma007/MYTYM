document.addEventListener("DOMContentLoaded", () => {
	addLangaugeText();
});

// add text to html page based on selected language

async function addLangaugeText() {
	const availableLangs = await getAvailableLangs();

	const currentLangauge = availableLangs.filter(lang => lang.selected === true)[0];
	const elementsToAddText = document.querySelectorAll("[data-translate-key]");

	// go through all elements and add text relative ac data-translate-key

	elementsToAddText.forEach(element => {
		const translateKey = element.getAttribute("data-translate-key");

		// fire if the element is inside the object

		if (typeof currentLangauge[translateKey] === "object") {
			const parentObjetct = currentLangauge[translateKey];

			// goes through each "key" of the pass object and add the text relative to the element

			Object.keys(parentObjetct).forEach(key => {
				const elementText = parentObjetct[key]; // retain the text relative to the element

				// fire if the element is input, changing its placeholder

				if (key === "input") {
					element
						.querySelector(key)
						.setAttribute("placeholder", elementText);

					return;
				}

				const elementChildren = element.querySelector(key).innerHTML; // returns the inner html with the children of the element

				// add the text, but without changing the previous inner HTML

				element.querySelector(key).innerHTML = elementText.replace(
					"{{child}}",
					elementChildren
				);
			});

			return;
		}

		const elementText = currentLangauge[translateKey]; // returns the text relative to the element
		const elementChildren = element.innerHTML; // returns the  inner HTML, with the children of the element

		element.innerHTML = elementText.replace("{{child}}", element.innerHTML); // adds the text but without changing the previous inner HTML
	});
}
//Fred Juma