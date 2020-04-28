import Techs from "./tech.json";
import Posts from "./post";
import Main from "./main";

const controllerMapping = {
  techs: Techs,
  posts: Posts,
  main: Main
};

export const ControllerFactory = {
  get: (name, func = null) => func ? controllerMapping[name][func] : 
    controllerMapping[func]
};