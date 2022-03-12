import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// Convert scrypt implementation from
// callback to async/await
const scryptAsync = promisify(scrypt);

export class PasswordManager {
  // Static methods, as these can be used w/o creating an instance of the class
  // So, Password.methodName() is completely valid

  // CONVERT A PASSWORD TO HASH:
  // usually done to store a new user password to the db
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    const hashedPassword = buf.toString("hex");

    return `${hashedPassword}.${salt}`;
  }

  // When Signing in, compare the stored (hashed) password
  // to the password provided by the user
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");

    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    const suppliedHashedPassword = buf.toString("hex");

    return hashedPassword === suppliedHashedPassword;
  }
}
