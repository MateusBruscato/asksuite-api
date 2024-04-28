class DateUtils {
  /**
   * Validates a string date
   * @param {Date} date
   * @returns {boolean}
   */
  static validateDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);
    const [yearString, monthString, dayString] = dateString.split('-');
    const areDayEqual = date.getDate() === parseInt(dayString);
    const areMonthEqual = date.getMonth() === parseInt(monthString) - 1;
    const areYearEqual = date.getFullYear() === parseInt(yearString);
    return !isNaN(date) && areDayEqual && areMonthEqual && areYearEqual;
  }

}

module.exports = DateUtils;
