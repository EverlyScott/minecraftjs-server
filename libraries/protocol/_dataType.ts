export default class DataType {
  value: any;
  bytes = 0;

  static from(data: Uint8Array, ...args: any[]) {}

  toBuffer() {
    return Buffer.from(this.value);
  }

  toUint8Array() {
    return Uint8Array.from(this.toBuffer());
  }
}
