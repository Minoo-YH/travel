import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, min: 2, max: 50, },

    email: { type: String, min: 5, max: 50,  unique: true },

    password: { type: String,  },

    phoneNumber: { type: String,  unique: true }, 

    country: { type: String,  },
    
    role: { type: String, enum: ["user", "admin"], default: "user" }
})

 const User = mongoose.model('User', userSchema);
export default User;

  