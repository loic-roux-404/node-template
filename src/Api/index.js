import TechRepository from "./Tech/repository";
import PostRepository from "./Post/repository";

const repositories = {
  tech: TechRepository,
  post: PostRepository
};

export const RepositoryFactory = {
  get: name => repositories[name]
};