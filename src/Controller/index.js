import Tech from "./tech";
import Post from "./post";
import Main from "./main";

const controllerMapping = {
  tech: Tech,
  post: Post,
  main: Main
};

export const ControllerFactory = {
  get: (name, func = null) => func ? controllerMapping[name][func] : 
    controllerMapping[func]
};