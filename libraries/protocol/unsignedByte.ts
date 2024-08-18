import DataType from "./_dataType";

export default class UnsignedByte extends DataType {
  value: number;
  bytes = 1;

  static from(data: Uint8Array) {
    return new UnsignedByte(Buffer.from(data).readUint8());
  }

  constructor(value: number) {
    super();
    this.value = value;
  }

  toBuffer() {
    const buf = Buffer.alloc(1);
    buf.writeUint8(this.value);
    return buf;
  }
}
