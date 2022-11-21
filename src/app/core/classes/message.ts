export interface Message {
  handle(): void;
}

export class QsdMessage implements Message {
  public handle() {}
}
