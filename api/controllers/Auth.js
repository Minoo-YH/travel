import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, country } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success:false, message:'name, email, password required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success:false, message:'Password must be 6+ chars' });
    }

    const emailLower = email.toLowerCase();
    const exists = await User.findOne({ email: emailLower });
    if (exists) return res.status(400).json({ success:false, message:'User already exists!' });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      name, email: emailLower, password: hashed, phoneNumber, country
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      user: { id:user._id, name:user.name, email:user.email, phoneNumber:user.phoneNumber, country:user.country }
    });
  } catch (error) {
    console.error('❌ Registration Error:', error);
    return res.status(500).json({ success:false, message: error.message || 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    if (!emailOrPhone || !password) {
      return res.status(400).json({ success:false, message:'Email/phone and password are required' });
    }

    const isEmail = emailOrPhone.includes('@');
    const query = isEmail ? { email: emailOrPhone.toLowerCase() } : { phoneNumber: emailOrPhone };

    const user = await User.findOne(query);
    if (!user) return res.status(404).json({ success:false, message:'User does not exist!' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ success:false, message:'Invalid credentials' });

    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

    return res.status(200).json({
      success:true,
      result:{ id:user._id, name:user.name, email:user.email, phoneNumber:user.phoneNumber, token }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success:false, message:'Server error' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (e) {
    console.error(e); res.status(500).json({ message:'Server error' });
  }
};

export const getUser = async (req, res) => {
  try {
    const u = await User.findById(req.params.id).select('-password');
    if (!u) return res.status(404).json({ message:'not found' });
    res.json(u);
  } catch (e) { console.error(e); res.status(500).json({ message:'Server error' }); }
};

export const deleteUser = async (req, res) => {
  try {
    const u = await User.findByIdAndDelete(req.params.id);
    if (!u) return res.status(404).json({ message:'User not found' });
    res.status(200).json({ message:'User deleted successfully.' });
  } catch (e) { console.error(e); res.status(500).json({ message:'Error deleting user.' }); }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, country } = req.body;
    const update = {};

    if (name !== undefined) update.name = name;
    if (email !== undefined) update.email = email.toLowerCase();
    if (phoneNumber !== undefined) update.phoneNumber = phoneNumber;
    if (country !== undefined) update.country = country;

    if (password) {
      update.password = await bcrypt.hash(password, 12);
    }

    const u = await User.findByIdAndUpdate(req.params.id, update, { new:true }).select('-password');
    if (!u) return res.status(404).json({ message:'User not found' });

    res.status(200).json({ success:true, message:'User updated successfully!', user:u });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success:false, message:'Server error' });
  }
};


