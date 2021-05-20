import { Provider } from "oidc-provider";
import config, { OPEN_ID_ISSUER } from "../model/config";

const provider = new Provider(`${OPEN_ID_ISSUER}`, config);

provider.proxy = true;

export default provider;
