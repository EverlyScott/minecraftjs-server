import DataType from "./_dataType";

export default class UnsignedShort extends DataType {
  value: number;
  bytes = 2;

  static from(data: Uint8Array) {
    return new UnsignedShort(Buffer.from(data).readUInt16BE());
  }

  constructor(value: number) {
    super();
    this.value = value;
  }

  toBuffer() {
    const buf = Buffer.alloc(2);
    buf.writeUint16BE(this.value);
    return buf;
  }
}
