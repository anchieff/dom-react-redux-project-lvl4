const apiPath = "/api/v1";

export default {
  loginPath: () => [apiPath, "login"].join("/"),
  getDataPath: () => [apiPath, "data"].join("/"),
  signupPath: () => [apiPath, "signup"].join("/"),
  socket: () => "/socket.io",
};
