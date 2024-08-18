import type DataType from "@/protocol/_dataType";
import VarInt from "@/protocol/varInt";
import type Socket from "@/socket";

export class ServerboundPacket {
  constructor(socket: Socket, data: Uint8Array, compressed: boolean) {}
}

export class ClientboundPacket {
  packetId?: number;
  data: DataType[] = [];

  constructor(...args: any[]) {}

  send(socket: Socket, compressed: boolean = true) {
    if (this.packetId === undefined) {
      throw new Error("packetId Is undefined!");
    }

    if (this.data.length === 0) {
      throw new Error("Packet has no data!");
    }

    const finalData = [new VarInt(this.packetId), ...this.data];

    const bytes: number[] = [];

    for (const data of finalData) {
      bytes.push(...data.toBuffer());
    }

    const finalPacket = Uint8Array.from([...new VarInt(bytes.length).toUint8Array(), ...bytes]);

    console.log(finalPacket);

    socket.sendPacket(finalPacket);
  }
}
