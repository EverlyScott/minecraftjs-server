import { ServerboundPacket } from "@/packet/_packet";
import VarInt from "@/protocol/varInt";
import type Socket from "@/socket";
import LoginSuccessPacket from "../clientbound/loginSuccess";
import String from "@/protocol/string";
import DisconnectPacket from "../../play/clientbound/disconnect";
import TextComponent from "@/protocol/textComponent";
import { State } from "@/socket";
import JoinGamePacket from "@/packet/play/clientbound/joinGame";
import Int from "@/protocol/int";
import { randomBytes } from "crypto";
import UnsignedByte from "@/protocol/unsignedByte";
import Byte from "@/protocol/byte";
import Boolean from "@/protocol/boolean";
import PlayerPositionAndLookPacket from "@/packet/play/clientbound/playerPositionAndLook";
import Double from "@/protocol/double";
import Float from "@/protocol/float";

export default class LoginStartPacket extends ServerboundPacket {
  name: string;

  constructor(socket: Socket, data: Uint8Array, compressed: boolean = false) {
    super(socket, data, compressed);

    if (compressed === true) {
      throw new Error("Login Start packet cannot be compressed!");
    }

    const length = VarInt.from(data);

    const name = Buffer.from(data.slice(length.bytes, length.bytes + length.value)).toString("utf-8");

    this.name = name;

    console.log(this);

    const loginSuccessPacket = new LoginSuccessPacket(new String(crypto.randomUUID()), new String(this.name));
    loginSuccessPacket.send(socket);

    socket.state = State.Play;

    const joinGamePacket = new JoinGamePacket(
      new Int(randomBytes(4).readInt32BE()),
      new UnsignedByte(1),
      new Byte(0),
      new UnsignedByte(0),
      new UnsignedByte(4),
      new String("default"),
      new Boolean(false)
    );
    joinGamePacket.send(socket);

    const playerPositionAndLookPacket = new PlayerPositionAndLookPacket(
      new Double(0),
      new Double(0),
      new Double(0),
      new Float(0),
      new Float(0),
      new Byte(0x0000000000)
    );

    playerPositionAndLookPacket.send(socket);

    // const disconnectPacket = new DisconnectPacket(
    //   new TextComponent({
    //     text: "Hello, world!",
    //   })
    // );
    // disconnectPacket.send(socket);
  }
}
