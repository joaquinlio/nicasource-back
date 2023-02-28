export interface IToken {
  sing: (input: { id: number; expiresIn: string }) => string;
}
