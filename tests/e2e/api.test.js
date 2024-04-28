const { describe, it, before, after } = require("mocha");
const supertest = require("supertest");
const { expect } = require("chai");
const moment = require("moment");

describe("API Suite Test", () => {
	let app;
	let server;

	before((done) => {
		app = require("../../server.js");
		server = app.listen(process.env.PORT || 9090, () => {
			console.log(`Listening on port ${process.env.PORT || 9090}`);
			done();
		});
	});

	after((done) => {
		server.close(() => {
			console.log("Server closed");
			done();
		});
	});

	describe("/search:post", () => {
		it("should return an error message if the body doesn't contain 'checkout' or 'checkin'", async () => {
			const body = {};
			const response = await supertest(app).post("/search").send(body);
			const expected = { message: 'Missing check-in or check-out date' };
			expect(response.status).to.be.equal(400);
			expect(response.body).to.be.eql(expected);
		});
		it("given an invalid date in 'checkout' or 'checkin', it should return an error message", async () => {
			const body = { checkin: "2022-02-29", checkout: "2022-01-32" };
			const response = await supertest(app).post("/search").send(body);
			const expected = { message: 'Invalid date, please use YYYY-MM-DD format or check if the date is valid' };
			expect(response.status).to.be.equal(400);
			expect(response.body).to.be.eql(expected);
		});
		it("given a 'checkin' date greater than 'checkout', it should return an error message", async () => {
			const body = { checkin: "2024-04-27", checkout: "2022-02-24" };
			const response = await supertest(app).post("/search").send(body);
			const expected = { message: 'Check-in date must be before checkout date' };
			expect(response.status).to.be.equal(400);
			expect(response.body).to.be.eql(expected);
		});
		it("given a 'checkin' date smaller than 'checkout', it should return an error message", async () => {
			const today = moment().format("YYYY-MM-DD");
			const beforeToday = moment().subtract(1, "day").format("YYYY-MM-DD");
			const body = { checkin: today, checkout: beforeToday };
			const response = await supertest(app).post("/search").send(body);
			const expected = { message: 'Check-in date must be before checkout date' };
			expect(response.status).to.be.equal(400);
			expect(response.body).to.be.eql(expected);
		
		});
		it("given a valid 'checkin' and 'checkout' date, it should return a list of available rooms", async () => {
			const today = moment().format("YYYY-MM-DD");
			const tomorrow = moment().add(2, "day").format("YYYY-MM-DD");
			const body = { checkin: today, checkout: tomorrow };
			const response = await supertest(app).post("/search").send(body);
			expect(response.status).to.be.equal(200);
			expect(response.body).to.be.an("array");
		});
	});
});
