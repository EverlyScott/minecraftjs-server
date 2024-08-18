import { State } from "@/socket";
import { ClientboundPacket, type ServerboundPacket } from "./_packet";
import HandshakePacket from "./handshaking/serverbound/handshake";
import DisconnectPacket from "./login/clientbound/disconnect";
import LoginStartPacket from "./login/serverbound/loginStart";

type PacketIdMap = {
  [key in State]: {
    clientbound?: { [key: number]: typeof ClientboundPacket };
    serverbound?: { [key: number]: typeof ServerboundPacket };
  };
};

const packetIdMap: PacketIdMap = {
  1: {
    serverbound: {
      0x00: HandshakePacket,
    },
  },
  2: {},
  3: {
    clientbound: {
      0x00: DisconnectPacket,
    },
    serverbound: {
      0x00: LoginStartPacket,
    },
  },
  4: {},
  5: {},
};

export default packetIdMap;
