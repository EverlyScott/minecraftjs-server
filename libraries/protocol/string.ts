import DataType from "./_dataType";
import VarInt from "./varInt";

export default class String extends DataType {
  value: string;

  static from(data: Uint8Array, maxLength: number) {
    let bytesRead = 0;

    const length = VarInt.from(data.slice(0, 5));

    bytesRead += length.bytes;

    if (length.value > maxLength) throw new Error("String length is greater than maxLength!");

    const value = Buffer.from(data.slice(bytesRead, bytesRead + length.value)).toString("utf-8");

    bytesRead += value.length;

    return new String(value, bytesRead);
  }

  constructor(value: string, bytes?: number) {
    super();
    this.value = value;
    if (bytes) {
      this.bytes = bytes;
    }
  }

  toBuffer() {
    return Buffer.from([...new VarInt(this.value.length).toBuffer(), ...Buffer.from(this.value)]);
  }
}
