const { DATE_PATTERN } = require("../constans/constants");
const moment = require('moment');

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function dateMiddleware(req, res, next) {
    const { checkin, checkout } = req.body;

    if (!checkin || !checkout) {
        return res
            .status(400)
            .json({ message: 'Missing check-in or check-out date' });
    }

    const areDateValid = moment(checkin, DATE_PATTERN).isValid() && moment(checkout, DATE_PATTERN).isValid();
    if (!areDateValid) {
        return res
            .status(400)
            .json({ message: 'Invalid date, please use YYYY-MM-DD format or check if the date is valid' });
    }

    const isCheckinBeforeToday = moment(checkin, DATE_PATTERN).isBefore(moment().format(DATE_PATTERN));
    if (isCheckinBeforeToday) {
        return res
            .status(400)
            .send({ message: 'Check-in date must be equal to or higher than today' });
    }
    
    const isCheckinBeforeCheckout = moment(checkin).isBefore(checkout);
    if (!isCheckinBeforeCheckout) {
        return res
            .status(400)
            .send({ message: 'Check-in date must be before checkout date' });
    }

    next();
}

module.exports = dateMiddleware;