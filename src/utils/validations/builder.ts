import {
  Required,
  RequiredNumber,
  RequiredPassword,
  RequiredString,
} from "./required";
import { Validator } from "./validator";

export class ValidationBuilder {
  private constructor(
    private readonly value: any,
    private readonly fieldName?: string,
    private readonly validators: Validator[] = []
  ) {}

  static of({
    value,
    fieldName,
  }: {
    value: any;
    fieldName?: string;
  }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName);
  }

  required(): ValidationBuilder {
    if (!this.value) {
      this.validators.push(new Required(this.fieldName, this.fieldName));
    }
    if (typeof this.value === "string") {
      this.validators.push(new RequiredString(this.value, this.fieldName));
    }

    return this;
  }

  password(): ValidationBuilder {
    this.validators.push(new RequiredPassword(this.value, this.fieldName));
    return this;
  }

  number(): ValidationBuilder {
    if (!this.value) {
      this.validators.push(new Required(this.fieldName, this.fieldName));
    }
    if (typeof this.value === "number") {
      this.validators.push(new RequiredNumber(this.value, this.fieldName));
    }

    return this;
  }

  build(): Validator[] {
    return this.validators;
  }
}
