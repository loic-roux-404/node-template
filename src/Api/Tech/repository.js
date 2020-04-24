import BootstrapApi from "../base";

const resource = "/posts";

export default {
  getAll() {
    return BootstrapApi.get(`${resource}`);
  },

  getTech(postId) {
    return BootstrapApi.get(`${resource}/${postId}`);
  },

  // createTech(payload) {
  //   return BootstrapApi.post(`${resource}`, payload);
  // }
};
