import gracefulShutdown from "http-graceful-shutdown";

const { NODE_ENV, IP, PORT } = {
  ...{ IP: "0.0.0.0", PORT: "80" },
  ...process.env,
};

const serverOptions = {
  timeout: 500,
};

/**
 * Launch a server
 *
 * @param {Express} app
 */
export default async (app) => {
  const server = app.listen(PORT, IP, () => {
    console.info(`Running in ${NODE_ENV} environment`);
    console.info(`Server running at http://${IP}:${PORT}`);
  });

  gracefulShutdown(server, serverOptions);
};
