import DataType from "./_dataType";

export default class Float extends DataType {
  value: number;
  bytes = 4;

  static from(data: Uint8Array) {
    return new Float(Buffer.from(data.slice(0, 4)).readFloatBE());
  }

  constructor(value: number) {
    super();

    this.value = value;
  }

  toBuffer() {
    const buf = Buffer.alloc(4);
    buf.writeFloatBE(this.value);
    return buf;
  }
}
