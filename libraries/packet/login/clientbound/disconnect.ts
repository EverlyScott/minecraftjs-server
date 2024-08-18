import { ClientboundPacket } from "@/packet/_packet";
import type { ITextComponent } from "@/protocol/textComponent";
import type TextComponent from "@/protocol/textComponent";
import type Socket from "@/socket";

export default class DisconnectPacket extends ClientboundPacket {
  packetId = 0x00;
  reason: ITextComponent;

  constructor(reason: TextComponent) {
    super();

    this.reason = reason.value;

    this.data.push(reason);
  }
}
