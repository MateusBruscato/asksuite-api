class UrlUtils {
  /**
   * @param {Object} paramsObj
   * @returns {string}
   */
  static mountSearchQuery(paramsObj) {
    const searchParams = new URLSearchParams(paramsObj);
    return searchParams.toString();
  }

  /**
   * @param {string} backgroundImage
   * @returns {string}
   */
  static parseUrlImageFromBackgroundImage(backgroundImage) {
    if (!backgroundImage) return "";
    const url = backgroundImage.replace('url("', "").replace('")', "");
    return url;
  }
}

module.exports = UrlUtils;
