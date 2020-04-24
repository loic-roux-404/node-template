import axios from "axios";

const baseDomain = "https://auth.provider.url";
const TOKEN = ''

const Repository = axios.create({
  baseDomain,
  headers: { Authorization: `Bearer ${TOKEN}` }
});

export default {
  // Just FYI...
  getRepo(param = '') {
    const query = {
        param: param
    };
    return Repository.post("", { query });
  }
};
