// import express = require("express");
import * as express from "express";
import { home, about } from "./controller/index";

// Note:
// This designe works perfictly for APIs,
// not so mouch for other things

// This would be a seprate Router in a second file.
class Index {
	router: express.Router;
	public constructor() {
		this.router = express.Router();
		this.routes();
	}

	public routes() {
		this.router.get("/", this.hello);
		this.router.get("/about", this.about);
	}

	hello = (req, res, next) => res.send("index.page");
	about = (req, res, next) => res.send("about.page");

	get indexRoutes() {
		return this.router;
	}
}

class Api {
	// our express instance
	express: express.Application;
	PORT = 3000;

	public constructor() {
		// create express applecation
		this.express = express();
		this.middleware();
		this.routes();
	}

	public routes() {
		const index = new Index();
		this.express.use(index.router);
	}
	public middleware() {
		this.express.use((req, res, next) => {
			// Don't allow caching.
			res.header("Cache-Control", "no-cache, no-store, must-revalidate");
			res.header("Pragma", "no-cache");
			res.header("Access-Control-Allow-Origin", "*");
			res.header(
				"Access-Control-Allow-Methods",
				"PUT, GET, POST, DELETE, OPTIONS"
			);
			res.header(
				"Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
			);
			res.header("Access-Control-Allow-Credentials", "true");
			next();
		});
	}
}

async function runServer(port, dbUrl) {
	const app = new Api();
	try {
		// await mongoose.connect(dbUrl, someOptions)
		await new Promise((resolve, rejects) => {
			const server = app.express.listen(PORT, err => {
				console.log(`listening on port ${PORT}!`);
				if (err) return rejects(err);
				return resolve();
			});
		}).catch(error => {
			console.log(error);
			// mongoose.disconnect();
		});
	} catch (err) {
		console.log(`Server exit with error: ${err}`);
	}
}

// ------------------------First way----------------------------
const PORT = process.env.PORT || 3000;
runServer(PORT, "URL");

// ------------------------Second way----------------------------
// const app = new Api();
// const server = app.express.listen(PORT, err => {
// 	console.log(`listening on port ${PORT}!`);
// });

// server.on("error", function() {
// disconect from mongoose;
// });

// ------------------------Threed way----------------------------
// const app: express.Application = express();
// const index = new Index();

// app.use(index.router);

// app.listen(PORT, function() {
// 	console.log(`listening on port ${PORT}!`);
// });
