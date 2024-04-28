const express = require("express");
const dateMiddleware = require("../middleware/dateMiddleware");
const router = express.Router();
const RoomsController = require("../controllers/RoomsController");

const roomsController = new RoomsController();

router.get("/", (req, res) => {
  res.send("Hello Asksuite World!");
});

router.post("/search", 
  dateMiddleware, 
  roomsController.getAllAvailableRooms.bind(roomsController)
);

module.exports = router;
