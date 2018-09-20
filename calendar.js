document.body.style.border = "5px solid red";

browser.browserAction.onClicked.addListener((tab) => {
	if (tab.url.includes("timetables.dkit.ie")) {
		browser.tabs.executeScript({
			file: "generate.js"
		});
	}
});