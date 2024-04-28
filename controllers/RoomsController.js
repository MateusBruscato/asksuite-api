const RoomsService = require("../services/RoomsService");

class RoomsController {
	constructor(roomsService = new RoomsService()) {
		this.roomsService = roomsService;
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 */
	async getAllAvailableRooms(req, res) {
		try {
			const { checkin, checkout } = req.body;
			const rooms = await this.roomsService.getAllAvailableRooms(checkin, checkout);
			return res.json(rooms);
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({
					message: error?.message || "Ops... Something went wrong. Please, try again later."
				})
		}
	}
}

module.exports = RoomsController;
