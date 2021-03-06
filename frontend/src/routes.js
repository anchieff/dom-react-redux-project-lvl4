const apiPath = "/api/v1";

export default {
  loginPath: () => [apiPath, "login"].join("/"),
  getDataPath: () => [apiPath, "data"].join("/"),
  socket: () => "/socket.io",
};
