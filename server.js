require("dotenv").config();
const express = require("express");
const router = require("./routes/router.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.use("/api-docs", 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
);
app.get("/swagger", (req, res) => {
	return res.sendFile(process.cwd() + "/swagger.json");
});
app.get("/docs", (req, res) => {
	return res.sendFile(process.cwd() + "/index.html");
});

app.use("/", router);
if (process.env.NODE_ENV !== 'test') {
	app.listen(port || 9090, () => {
		console.log(`Listening on port ${port}`);
	});
}

module.exports = app;