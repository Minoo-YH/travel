import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, minlength: 2, maxlength: 50, required: true },
  email: { type: String, minlength: 5, maxlength: 50, unique: true, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, unique: true, sparse: true },
  country: { type: String },
  role: { type: String, enum: ['user','admin'], default: 'user' }
},{ timestamps:true });
export default mongoose.model('User', userSchema);
