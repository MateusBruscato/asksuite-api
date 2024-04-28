const { Page } = require("puppeteer");
const { DEFAULT_SEARCH_PARAMS } = require("../constans/constants");
const UrlUtils = require("../utils/url.utils");
const BrowserService = require("./BrowserService");

class RoomsService {
    constructor() {}

    /**
     * @param {string} checkin
     * @param {string} checkout
     * @returns {Promise<Array>}
     */
    async getAllAvailableRooms(checkin, checkout) {
      try {
        const browser = await BrowserService.getBrowser();
        const url = this.#getUrl(checkin, checkout);
        const page = await browser.newPage(url);
        await page.goto(url);
        await this.#waitLoadTime(page);
        const availableRooms = await this.#getAvailableRoomsInfo(page);
        await BrowserService.closeBrowser(browser);
        return availableRooms;
      } catch (error) {
        console.error(error);
        return [];
      }
    }

    /**
     * @param {Page} page
     * @returns {Promise<Array>}
     */
    async #getAvailableRoomsInfo(page) {
      const rawRoomsInfo = await page.$$eval(".room-option", (room) => {
        return room.map((room) => {
          const name = room.querySelector(".room-option-title span").innerText;
          const price = room.querySelector(".daily-price--total .term").innerText;
          const image = room.querySelector(".q-carousel__slides-container .q-carousel__slide").style.backgroundImage;
          const description = room.querySelector(".room-infos-guests-block p").innerText;
          return {
            name,
            price,
            image,
            description,
          };
        });
      });
      return this.#parseRoomsInfo(rawRoomsInfo);
    }

    /**
     * @param {Array} rawRoomsInfo
     * @returns {Array}
     */
    #parseRoomsInfo(rawRoomsInfo) {
      return rawRoomsInfo.map((room) => {
        room.image = UrlUtils.parseUrlImageFromBackgroundImage(room.image);
        return room;
      });
    }

    /**
     * @param {Page} page
     * @returns {Promise<void>}
     */
    async #waitLoadTime(page) {
      await page.waitForSelector(".q-skeleton");
      await page.waitForFunction(() => !document.querySelector(".q-skeleton"));
    }

    /**
     * @param {string} checkin
     * @param {string} checkout
     * @returns {string}
     */
    #getUrl(checkin, checkout) {
      const baseUrl = process.env.BASE_URL;
      const searchParams = UrlUtils.mountSearchQuery({
        checkin,
        checkout,
        ...DEFAULT_SEARCH_PARAMS,
      });
      return `${baseUrl}?${searchParams}`;
    }
}

module.exports = RoomsService;
