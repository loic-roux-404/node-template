import mongoInit from "./database.js";
import UsersController from "../controllers/UserController.js";
import MainController from "../controllers/MainController.js";
import ProductController from "../controllers/HotelController.js";
import containerInit from "./container.js";

const controllers = [MainController, UsersController, ProductController];

export { mongoInit, controllers, containerInit };
