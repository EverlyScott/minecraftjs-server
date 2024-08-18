import { ClientboundPacket } from "@/packet/_packet";
import type Boolean from "@/protocol/boolean";
import type Byte from "@/protocol/byte";
import type Int from "@/protocol/int";
import type String from "@/protocol/string";
import type UnsignedByte from "@/protocol/unsignedByte";

export default class JoinGamePacket extends ClientboundPacket {
  packetId = 0x01;

  entityId: number;
  gamemode: number;
  dimension: number;
  difficulty: number;
  maxPlayers: number;
  levelType: string;
  reducedDebugInfo: boolean;

  constructor(
    entityId: Int,
    gamemode: UnsignedByte,
    dimension: Byte,
    difficulty: UnsignedByte,
    maxPlayers: UnsignedByte,
    levelType: String,
    reducedDebugInfo: Boolean
  ) {
    super();

    this.entityId = entityId.value;
    this.gamemode = gamemode.value;
    this.dimension = dimension.value;
    this.difficulty = difficulty.value;
    this.maxPlayers = maxPlayers.value;
    this.levelType = levelType.value;
    this.reducedDebugInfo = reducedDebugInfo.value;

    this.data.push(entityId, gamemode, dimension, difficulty, maxPlayers, levelType, reducedDebugInfo);
  }
}
