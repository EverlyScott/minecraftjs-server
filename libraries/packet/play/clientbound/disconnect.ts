import { ClientboundPacket } from "@/packet/_packet";
import type { ITextComponent } from "@/protocol/textComponent";
import type TextComponent from "@/protocol/textComponent";

export default class DisconnectPacket extends ClientboundPacket {
  packetId = 0x1d;
  reason: ITextComponent;

  constructor(reason: TextComponent) {
    super();

    this.reason = reason.value;

    this.data.push(reason);
  }
}
