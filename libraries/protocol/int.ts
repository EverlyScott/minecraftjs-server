import DataType from "./_dataType";

export default class Int extends DataType {
  value: number;
  bytes = 4;

  static from(data: Uint8Array) {
    return new Int(Buffer.from(data.slice(0, 4)).readInt32BE());
  }

  constructor(value: number) {
    super();

    this.value = value;
  }

  toBuffer() {
    const buf = Buffer.alloc(4);
    buf.writeInt32BE(this.value);
    return buf;
  }
}
