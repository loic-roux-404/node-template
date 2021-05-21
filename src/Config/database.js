import connect from "../modules/mongodb/connect";

export default (async () => connect(process.env))();
