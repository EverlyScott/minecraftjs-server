import DataType from "./_dataType";

export default class Boolean extends DataType {
  value: boolean;
  bytes = 1;

  static from(data: Uint8Array) {
    return new Boolean(Buffer.from(data.slice(0, 1)).at(0) === 0x01);
  }

  constructor(value: boolean) {
    super();

    this.value = value;
  }

  toBuffer() {
    const val = this.value === true ? 0x01 : 0x00;

    return Buffer.from([val]);
  }
}
