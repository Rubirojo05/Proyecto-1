import { ErrorOwn } from "./errorOwn";

export class Result<T> {
  private isOk: boolean;
  private value?: T;
  private error?: ErrorOwn;

  private constructor(isOk: boolean, value?: T, error?: ErrorOwn) {
    this.isOk = isOk;
    this.value = value;
    this.error = error;
  }

  static success<T>(value: T): Result<T> {
    return new Result<T>(true, value);
  }
  static error<T>(error?: ErrorOwn): Result<T> {
    return new Result<never>(false, undefined, error);
  }

  isSuccess(): boolean {
    return this.isOk;
  }
  isFailure(): boolean {
    return !this.isOk;
  }
  getValue(): T | never {
    return this.value as T;
  }
  getError(): ErrorOwn | never {
    return this.error as ErrorOwn;
  }
}
