import { ClientboundPacket } from "@/packet/_packet";
import type String from "@/protocol/string";

export default class LoginSuccessPacket extends ClientboundPacket {
  packetId = 0x02;
  uuid: string;
  username: string;

  constructor(uuid: String, username: String) {
    super();

    this.uuid = uuid.value;
    this.username = username.value;

    this.data.push(uuid, username);
  }
}
