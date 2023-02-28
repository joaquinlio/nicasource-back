import { Hasher } from "../gateways/hasher";

export const makeHashPassword = (): Hasher => new Hasher(10);
