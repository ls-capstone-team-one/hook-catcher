import "dotenv/config";
import app from "./app";
import wsManager from "./websockets/connectionManager";
import http from "http";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

wsManager.init(server);

server.listen(PORT, () => {
  console.log(`HookCatcher server listening on port ${PORT}`);
});
