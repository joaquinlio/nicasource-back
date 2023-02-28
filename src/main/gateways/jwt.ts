import { sign } from "jsonwebtoken";

export class JwtTokenHandler {
  constructor(private readonly secret: string) {}

  sing({ id, expiresIn }: { id: number; expiresIn: string }): string {
    return sign({ id }, this.secret, {
      expiresIn,
    });
  }
}
