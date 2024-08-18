import Logger, { LogLevel } from "@/logger";
import { MinecraftJS } from "@/server";
import Socket from "@/socket";
import net from "net";

export default class TcpManager {
  tcpServer: net.Server;
  sockets: Socket[] = [];
  open = false;

  constructor() {
    Logger.log(LogLevel.Debug, "Creating TCP server");
    this.tcpServer = net.createServer((socket) => {
      this.listener(socket);
    });

    Logger.log(LogLevel.Debug, "Starting TCP server");
    this.tcpServer.listen(MinecraftJS.config.port, MinecraftJS.config.ip, 0, () => {
      Logger.log(LogLevel.Normal, `Server started on port ${MinecraftJS.config.port}`);
    });

    this.tcpServer.on("connection", (newSocket) => {
      const socket = new Socket(newSocket);
      this.sockets.push(socket);
    });
  }

  stop() {
    Logger.log(LogLevel.Debug, "Closing TCP server");
    this.tcpServer.close((err) => {
      if (err) {
        return console.error(err);
      }

      this.open = false;
    });
  }

  private listener(socket: net.Socket) {
    this.open = true;
  }
}
