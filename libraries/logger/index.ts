import { MinecraftJS } from "@/server";

export enum LogLevel {
  Normal = "normal",
  Warn = "warn",
  Error = "error",
  Debug = "debug",
}

export default class Logger {
  private static writeToFile() {}

  static log(type: LogLevel, ...data: any[]) {
    switch (type) {
      case LogLevel.Debug:
        if (MinecraftJS.config.debug) {
          console.debug("[Debug]", ...data);
        }
        break;
      case LogLevel.Error:
        console.error("[Error]", ...data);
        break;
      case LogLevel.Warn:
        console.warn("[Warn]", ...data);
        break;
      default:
        console.log(...data);
    }
  }
}
