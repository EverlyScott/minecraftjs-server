import { z } from "zod";
import DataType from "./_dataType";
import VarInt from "./varInt";

export const textComponent = z.object({
  text: z.string(),
});

export type ITextComponent = z.infer<typeof textComponent>;

export default class TextComponent extends DataType {
  value: ITextComponent;

  static from(data: Uint8Array) {
    const jsonString = new TextDecoder().decode(data);

    const parsed = JSON.parse(jsonString);

    return new TextComponent(parsed);
  }

  constructor(value: ITextComponent) {
    super();
    const parsed = textComponent.safeParse(value);

    if (parsed.success) {
      this.value = parsed.data;
    } else {
      throw new Error(`Failed to parse text component: ${parsed.error}`);
    }
  }

  toBuffer() {
    return Buffer.from(this.toUint8Array());
  }

  toUint8Array() {
    const jsonString = JSON.stringify(this.value);

    return Uint8Array.from([...new TextEncoder().encode(jsonString)]);
  }
}
