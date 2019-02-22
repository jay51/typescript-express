"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// import express = require("express");
var express = require("express");
// Note:
// This designe works perfictly for APIs,
// not so mouch for other things
// This would be a seprate Router in a second file.
var Index = /** @class */ (function () {
    function Index() {
        this.hello = function (req, res, next) { return res.send("index.page"); };
        this.about = function (req, res, next) { return res.send("about.page"); };
        this.router = express.Router();
        this.routes();
    }
    Index.prototype.routes = function () {
        this.router.get("/", this.hello);
        this.router.get("/about", this.about);
    };
    Object.defineProperty(Index.prototype, "indexRoutes", {
        get: function () {
            return this.router;
        },
        enumerable: true,
        configurable: true
    });
    return Index;
}());
var Api = /** @class */ (function () {
    function Api() {
        this.PORT = 3000;
        // create express applecation
        this.express = express();
        this.middleware();
        this.routes();
    }
    Api.prototype.routes = function () {
        var index = new Index();
        this.express.use(index.router);
    };
    Api.prototype.middleware = function () {
        this.express.use(function (req, res, next) {
            // Don't allow caching.
            res.header("Cache-Control", "no-cache, no-store, must-revalidate");
            res.header("Pragma", "no-cache");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
    };
    return Api;
}());
function runServer(port, dbUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var app, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new Api();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    // await mongoose.connect(dbUrl, someOptions)
                    return [4 /*yield*/, new Promise(function (resolve, rejects) {
                            var server = app.express.listen(PORT, function (err) {
                                console.log("listening on port " + PORT + "!");
                                if (err)
                                    return rejects(err);
                                return resolve();
                            });
                        })["catch"](function (error) {
                            console.log(error);
                            // mongoose.disconnect();
                        })];
                case 2:
                    // await mongoose.connect(dbUrl, someOptions)
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log("Server exit with error: " + err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// ------------------------First way----------------------------
var PORT = process.env.PORT || 3000;
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
