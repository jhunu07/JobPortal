// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   resume: { type: String },
//   image: { type: String, required: true }
// });

// const User = mongoose.model('User', userSchema);

// export default User;



import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: { type: String }, // Clerk user id
  email: { type: String, required: true },
  image: { type: String },
  name: { type: String },
  resume: { type: String } // optional resume
}, { timestamps: true }); 

export default mongoose.models.User || mongoose.model("User", UserSchema);
