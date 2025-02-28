// result.ts
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

  static error<T>(error: ErrorOwn): Result<T> {
    return new Result<T>(false, undefined, error);
  }

  isSuccess(): boolean {
    return this.isOk;
  }

  isFailure(): boolean {
    return !this.isOk;
  }

  getValue(): T {
    if (this.isFailure()) {
      throw new Error("Cannot get the value of a failed result.");
    }
    return this.value as T;
  }

  getError(): ErrorOwn {
    if (this.isSuccess()) {
      throw new Error("Cannot get the error of a successful result.");
    }
    return this.error as ErrorOwn;
  }
}