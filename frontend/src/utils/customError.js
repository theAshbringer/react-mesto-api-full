export class ErrorWithMsg extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }
}