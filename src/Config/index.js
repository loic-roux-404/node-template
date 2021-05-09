import UsersController from "../controllers/UserController";
import MainController from "../controllers/MainController";
import ProductController from "../controllers/HotelController";
import RoomController from "../controllers/RoomController";
import containerInit from "./container.js";

const controllers = [
  MainController,
  UsersController,
  ProductController,
  RoomController,
];

export { containerInit, controllers };
