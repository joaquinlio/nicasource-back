import { InvalidFieldError, RequiredFieldError } from "../errors";
import { Validator } from "./validator";

export class Required implements Validator {
  constructor(readonly value: any, readonly fieldName?: string) {}

  validate(): Error | undefined {
    if (this.value === null || this.value === undefined) {
      return new RequiredFieldError(this.fieldName);
    }
  }
}

export class RequiredString extends Required {
  constructor(
    override readonly value: string,
    override readonly fieldName?: string
  ) {
    super(value, fieldName);
  }

  override validate(): Error | undefined {
    if (super.validate() !== undefined || this.value === "") {
      return new RequiredFieldError(this.fieldName);
    }
  }
}

export class RequiredPassword extends Required {
  constructor(
    override readonly value: string,
    override readonly fieldName?: string
  ) {
    super(value, fieldName);
  }

  override validate(): Error | undefined {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (super.validate() !== undefined || !regex.test(this.value)) {
      return new InvalidFieldError(this.fieldName);
    }
  }
}

export class RequiredNumber extends Required {
  constructor(
    override readonly value: number,
    override readonly fieldName?: string
  ) {
    super(value, fieldName);
  }

  override validate(): Error | undefined {
    if (super.validate() !== undefined || isNaN(this.value)) {
      return new RequiredFieldError(this.fieldName);
    }
  }
}
