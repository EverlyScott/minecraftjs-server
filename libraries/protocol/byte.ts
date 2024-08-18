import DataType from "./_dataType";

export default class Byte extends DataType {
  value: number;
  bytes = 1;

  static from(data: Uint8Array) {
    return new Byte(Buffer.from(data).readInt8());
  }

  constructor(value: number) {
    super();
    this.value = value;
  }

  toBuffer() {
    const buf = Buffer.alloc(1);
    buf.writeInt8(this.value);
    return buf;
  }
}
