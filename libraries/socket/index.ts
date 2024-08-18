import PacketHandler from "@/packet";
import DisconnectPacket from "@/packet/login/clientbound/disconnect";
import String from "@/protocol/string";
import TextComponent from "@/protocol/textComponent";
import VarInt from "@/protocol/varInt";
import net from "net";

export const enum State {
  Handshaking = 1,
  Status = 2,
  Login = 3,
  Configuration = 4,
  Play = 5,
}

export default class Socket {
  socket: net.Socket;
  state: State = State.Handshaking;

  constructor(socket: net.Socket) {
    this.socket = socket;

    this.socket.on("data", (dataBuffer) => {
      try {
        const data = Uint8Array.from(dataBuffer);
        const packet = PacketHandler.from(this, data, false);
      } catch (err) {
        console.error(err);
      }
    });
  }

  sendPacket(data: Uint8Array) {
    this.socket.write(data);
  }

  getState() {
    return this.state;
  }
}
