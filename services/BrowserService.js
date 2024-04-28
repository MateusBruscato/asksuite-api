const puppeteer = require("puppeteer");

class BrowserService {
	/**
	 * @returns {Promise<Browser>}
	 */
	static getBrowser() {
		const puppeteerOptions = {
			headless: "new",
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
			ignoreDefaultArgs: ["--disable-extensions"],
		};

		if (process.platform !== "win32") {
			puppeteerOptions.executablePath = "/usr/bin/google-chrome";
		}

		return puppeteer.launch(puppeteerOptions);
	}

	/**
	 * @param {puppeteer.Browser} browser
	 * @returns {Promise<void>}
	 */
	static closeBrowser(browser) {
		if (!browser) {
			return;
		}
		return browser.close();
	}
}

module.exports = BrowserService;
