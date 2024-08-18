import type DataType from "@/protocol/_dataType";
import VarInt from "@/protocol/varInt";
import packetIdMap from "./packetIdMap";
import { ServerboundPacket } from "./_packet";
import type { State } from "@/socket";
import type Socket from "@/socket";

export default class PacketHandler {
  packetId: number;

  static from(socket: Socket, packet: Uint8Array, compressed: boolean): ServerboundPacket[] {
    if (compressed) {
      throw new Error("Not implemented!");
    }

    let bytesRead = 0;

    const packetLength = VarInt.from(packet.slice(0, 5));

    bytesRead += packetLength.bytes;

    const packetId = VarInt.from(packet.slice(bytesRead, bytesRead + 5));

    bytesRead += packetId.bytes;

    const state = socket.state;

    if (!packetIdMap[state].serverbound?.[packetId.value]) {
      throw new Error(`Packet 0x${packetId.value.toString(16)} not implemented!`);
    }

    const PacketClass = packetIdMap[state].serverbound[packetId.value];

    const firstPacket = new PacketClass(socket, packet.slice(bytesRead, packetLength.value + bytesRead - 1), false);

    if (packetLength.value + packetLength.bytes !== packet.length) {
      const otherPackets = PacketHandler.from(
        socket,
        packet.slice(packetLength.value + packetLength.bytes),
        compressed
      );

      // Coalesced packets
      return [firstPacket, ...otherPackets];
    }

    return [firstPacket];
  }

  constructor(state: State, packetId: number, data: DataType) {
    this.packetId = packetId;
  }
}
