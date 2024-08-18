import fs from "fs";
import baseConfig from "./baseConfig.json";
import type { NoUndefinedField } from "types";

interface StoredConfig {
  port: Config["port"] | undefined;
  ip: Config["ip"] | undefined;
  debug: Config["debug"] | undefined;
}

export default class Config {
  port: number;
  ip: string;
  debug: boolean;

  constructor() {
    if (!fs.existsSync("config.json")) {
      this.writeDefaultConfig();
    }

    const config: StoredConfig = JSON.parse(fs.readFileSync("config.json", "utf-8"));

    this.port = config.port ?? baseConfig.port;
    this.ip = config.ip ?? baseConfig.ip;
    this.debug = config.debug ?? baseConfig.debug;

    this.updateConfig();
  }

  private updateConfig() {
    fs.writeFileSync(
      "config.json",
      JSON.stringify(
        {
          port: this.port,
          ip: this.ip,
          debug: this.debug,
        } as NoUndefinedField<StoredConfig>,
        null,
        2
      )
    );
  }

  private writeDefaultConfig() {
    fs.writeFileSync("config.json", JSON.stringify(baseConfig, null, 2));
  }
}
