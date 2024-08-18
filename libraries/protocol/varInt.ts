import DataType from "./_dataType";

export default class VarInt extends DataType {
  static SEGMENT_BITS = 0x7f;
  static CONTINUE_BIT = 0x80;

  value: number;

  static from(data: Uint8Array) {
    let value = 0;
    let position = 0;
    let bytes = 0;
    let currentByte: number;

    while (true) {
      currentByte = data[bytes];
      value |= (currentByte & VarInt.SEGMENT_BITS) << position;

      position += 7;
      bytes++;

      if ((currentByte & VarInt.CONTINUE_BIT) === 0) break;

      if (position >= 32) throw new Error("VarInt is too big!");
    }

    return new VarInt(value, bytes);
  }

  constructor(value: number, bytes?: number) {
    super();
    this.value = value;
    if (bytes) this.bytes = bytes;
  }

  toBuffer() {
    const bytes: number[] = [];
    let workingValue = this.value;

    while (true) {
      // Check if the current value fits in a single byte (7 bits)
      if ((workingValue & ~VarInt.SEGMENT_BITS) === 0) {
        bytes.push(workingValue);
        break;
      }

      // Store the lower 7 bits and mark the continuation bit
      bytes.push((workingValue & VarInt.SEGMENT_BITS) | VarInt.CONTINUE_BIT);

      // Shift right by 7 bits to process the next segment
      workingValue >>>= 7;
    }

    return Buffer.from(bytes);
  }
}
