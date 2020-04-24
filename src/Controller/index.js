import Techs from "./Tech/techs";
import Posts from "./Post/posts";
import Home from "./Main/home";

const dataTypes = {
  techs: Techs,
  posts: Posts,
  home: Home
};

export const DataFactory = {
  get: name => dataTypes[name]
};