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

    const checkinFormatted = moment(checkin, DATE_PATTERN);
    const checkoutFormatted = moment(checkout, DATE_PATTERN);
    
    const areDateValid = checkinFormatted.isValid() && checkoutFormatted.isValid();
    if (!areDateValid) {
        return res
            .status(400)
            .json({ message: 'Invalid date, please use YYYY-MM-DD format or check if the date is valid' });
    }

    const isCheckinBeforeToday = checkinFormatted.isBefore(moment().format(DATE_PATTERN));
    if (isCheckinBeforeToday) {
        return res
            .status(400)
            .send({ message: 'Check-in date must be before checkout date' });
    }
    
    const isCheckinBeforeCheckout = checkinFormatted.isBefore(checkout, DATE_PATTERN);
    if (!isCheckinBeforeCheckout) {
        return res
            .status(400)
            .send({ message: 'Check-in date must be before checkout date' });
    }

    const monthsAheadFromToday = moment().add(process.env.LIMIT_MONTHS_AHEAD, "month");
    const checkinIsTooFarFromToday = checkinFormatted.isAfter(monthsAheadFromToday);
    if (checkinIsTooFarFromToday) {
        return res
            .status(400)
            .send({ message: 'Check-in is far ahead, please try a sooner date.'})
    }

    next();
}

module.exports = dateMiddleware;