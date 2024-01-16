export class AppHttpError extends Error {
  constructor(public readonly originalError?: any) {
    super();
  }
}
