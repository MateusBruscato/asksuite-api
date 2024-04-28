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
		const { checkin, checkout } = req.body;
		const rooms = await this.roomsService.getAllAvailableRooms(checkin, checkout);
		return res.json(rooms);
	}
}

module.exports = RoomsController;
