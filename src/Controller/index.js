import Tech from "./tech.js";
import Post from "./post.js";
import Main from "./main.js";

const controllerMapping = {
  tech: Tech,
  post: Post,
  main: Main
};

export const ControllerFactory = {
  get: (name, func = null) => func ? controllerMapping[name][func] : 
    controllerMapping[func]
};