import DataType from "./_dataType";

export default class Double extends DataType {
  value: number;
  bytes = 8;

  static from(data: Uint8Array) {
    return new Double(Buffer.from(data.slice(0, 8)).readDoubleBE());
  }

  constructor(value: number) {
    super();

    this.value = value;
  }

  toBuffer() {
    const buf = Buffer.alloc(8);
    buf.writeDoubleBE(this.value);
    return buf;
  }
}
