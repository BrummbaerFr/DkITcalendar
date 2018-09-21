document.body.style.border = "5px solid red";

/* When the generator sent back the file, store it
* in a blob and download it to the user's PC: */
function download(file) {
	console.log(file["file"]);

	var blob = new Blob([file["file"]], {type : 'text/plain'});
	var objectURL = URL.createObjectURL(blob);

	browser.downloads.download({filename: file["filename"] + ".ics", url: objectURL});
}

/* When the extension button is clicked, the tab URL
* is checked to make sure we're on a DkIT timetable.
* If that's the case, the generate script is called.*/
browser.browserAction.onClicked.addListener((tab) => {
	// Launch the script only when we're on a timetable page:
	if (tab.url.includes("timetables.dkit.ie")) {
		browser.tabs.executeScript({
			file: "generate.js"
		});

		// Listen for the generator's response:
		browser.runtime.onMessage.addListener(download);
	}
});