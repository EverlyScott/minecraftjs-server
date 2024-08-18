import { ClientboundPacket } from "@/packet/_packet";
import type Byte from "@/protocol/byte";
import type Double from "@/protocol/double";
import type Float from "@/protocol/float";

export default class PlayerPositionAndLookPacket extends ClientboundPacket {
  packetId = 0x08;

  x: number;
  y: number;
  z: number;
  yaw: number;
  pitch: number;
  //TODO: make flags more specific since it's a bitfield!
  flags: number;

  constructor(x: Double, y: Double, z: Double, yaw: Float, pitch: Float, flags: Byte) {
    super();

    this.x = x.value;
    this.y = y.value;
    this.z = z.value;
    this.yaw = yaw.value;
    this.pitch = pitch.value;
    this.flags = flags.value;

    this.data.push(x, y, z, yaw, pitch, flags);
  }
}
