document.body.style.border = "5px solid red";

function download(file) {
	console.log(file["file"]);

	var blob = new Blob([file["file"]], {type : 'text/plain'});
	var objectURL = URL.createObjectURL(blob);

	browser.downloads.download({filename: file["filename"], url: objectURL});
}

browser.browserAction.onClicked.addListener((tab) => {
	if (tab.url.includes("timetables.dkit.ie")) {
		browser.tabs.executeScript({
			file: "generate.js"
		});

		browser.runtime.onMessage.addListener(download);
	}
});