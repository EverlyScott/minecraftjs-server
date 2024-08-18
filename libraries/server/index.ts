import Config from "@/config";
import Logger, { LogLevel } from "@/logger";
import VarInt from "@/protocol/varInt";
import TcpManager from "@/tcp";

export class MinecraftJS {
  starting = true;
  static config = new Config();
  tcpManager?: TcpManager;

  constructor() {
    try {
      process.on("SIGINT", () => {
        this.stop();
      });

      this.start();
    } catch (err) {
      Logger.log(LogLevel.Error, err);
      this.stop();
    }
  }

  private start() {
    Logger.log(LogLevel.Normal, "Initializing Minecraft.JS");

    Logger.log(LogLevel.Normal, "Starting server");
    this.tcpManager = new TcpManager();
  }

  stop() {
    Logger.log(LogLevel.Normal, "\nClosing server");
    if (this.tcpManager) {
      this.tcpManager.stop();
      setTimeout(() => {
        if (this.tcpManager?.open) {
          console.error("TCP server is still open after 3 seconds! Forcing exit.");
          process.kill(process.pid, "SIGKILL");
        }
      }, 3000);
    }
    Logger.log(LogLevel.Normal, "Goodbye");
    process.exit();
  }
}

const server = new MinecraftJS();

export default server;
