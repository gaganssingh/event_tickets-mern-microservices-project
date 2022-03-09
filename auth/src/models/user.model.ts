import mongoose from "mongoose";
import { Password } from "../utilities/password";

// Describes the shape of the user schema
interface UserAttrs {
  email: string;
  password: string;
}

// Describe what's in a User document store in mongodb
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// Describes any additional methods on the User model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password BEFORE saving it to the database
userSchema.pre("save", async function (done) {
  // Make sure it's not a password change request
  // SUCH AS: CHANGED THE EMAIL BUT KEPT THE SAME PASSWORD
  if (this.isModified("password")) {
    const hashedPassword = await Password.toHash(this.get("password"));

    this.set("password", hashedPassword);
    done();
  }
});

// ADD a method to the userSchema Object itself
// Will be accessible on User.build()
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
