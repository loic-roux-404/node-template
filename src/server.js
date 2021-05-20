const { NODE_ENV, IP, PORT } = {
  ...{ IP: "0.0.0.0", PORT: "80" },
  ...process.env,
};

/**
 * Launch a server
 *
 * @param {Express} app
 */
export default (app) => {
  app.listen(PORT, IP, () => {
    console.info(`Running in ${NODE_ENV} environment`);
    console.info(`Server running at http://${IP}:${PORT}`);
  });

  process
    .on("unhandledRejection", (reason, p) => {
      throw reason;
    })
    .on("uncaughtException", (err) => {
      console.error(err, "Uncaught Exception thrown");
    });
};
