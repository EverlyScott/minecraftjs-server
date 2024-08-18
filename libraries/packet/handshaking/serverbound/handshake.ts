import { ServerboundPacket } from "@/packet/_packet";
import String from "@/protocol/string";
import UnsignedShort from "@/protocol/unsignedShort";
import VarInt from "@/protocol/varInt";
import type Socket from "@/socket";
import { State } from "@/socket";

export default class HandshakePacket extends ServerboundPacket {
  protocolVersion: number;
  serverAddress: string;
  serverPort: number;
  nextState: State;

  constructor(socket: Socket, data: Uint8Array, compressed: boolean = false) {
    super(socket, data, compressed);

    if (compressed === true) {
      throw new Error("Handshake packet cannot be compressed!");
    }

    let bytesRead = 0;

    const protocolVersion = VarInt.from(data);
    this.protocolVersion = protocolVersion.value;

    bytesRead += protocolVersion.bytes;

    const serverAddress = String.from(data.slice(bytesRead), 255);
    this.serverAddress = serverAddress.value;

    bytesRead += serverAddress.bytes;

    const serverPort = UnsignedShort.from(data.slice(bytesRead, bytesRead + 2));
    this.serverPort = serverPort.value;

    bytesRead += serverPort.bytes;

    const nextState = VarInt.from(data.slice(bytesRead));
    switch (nextState.value) {
      case 1:
        this.nextState = State.Status;
        break;
      case 2:
        this.nextState = State.Login;
        break;
      case 3:
        this.nextState = State.Login;
        break;
      default:
        throw new Error("HandshakePacket.nextState contains an invalid enum value!");
    }

    console.log(this);

    socket.state = this.nextState;
  }
}
