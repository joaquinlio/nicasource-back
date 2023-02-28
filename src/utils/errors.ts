export class ServerError extends Error {
  constructor(error?: Error) {
    super("Server failed. Try again soon");
    this.name = "ServerError";
    this.stack = error?.stack;
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends Error {
  constructor() {
    super("Not found");
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends Error {
  constructor() {
    super("Access denied");
    this.name = "ForbiddenError";
  }
}

export class ExistingUserError extends Error {
  constructor() {
    super("Email is already in use");
    this.name = "ExistingUserError";
  }
}

export class RequiredFieldError extends Error {
  constructor(fieldName?: string) {
    const message =
      fieldName === undefined
        ? "Field required"
        : `The field ${fieldName} is required`;
    super(message);
    this.name = "RequiredFieldError";
  }
}

export class InvalidFieldError extends Error {
  constructor(fieldName?: string) {
    const message =
      fieldName === undefined
        ? "Field required"
        : `The field ${fieldName} is invalid`;
    super(message);
    this.name = "InvalidFieldError";
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Email or Password incorrect");
    this.name = "InvalidCredentialsError";
  }
}
