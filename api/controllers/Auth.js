import User from "../models/Auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, country } =
      req.body;

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be 6 characters or more",
      });
    }

    const emailLowerCase = email.toLowerCase();

    const existedUser = await User.findOne({ email: emailLowerCase });
    if (existedUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: emailLowerCase,
      password: hashedPassword,
      phoneNumber,
      country,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        country: user.country
      },
    });
  } catch (error) {
  console.error("❌ Registration Error:", error); // يطبع الخطأ كامل في Render Logs
  return res.status(500).json({
    success: false,
    message: error.message || "Server error. Please try again later.",
  });
  }
};

export const login = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    return res.status(400).json({
      success: false,
      message: "Email or phone number and password are required",
    });
  }

  const isEmail = emailOrPhone.includes("@");
  const query = isEmail
    ? { email: emailOrPhone.toLowerCase() }
    : { phoneNumber: emailOrPhone };

  const existedUser = await User.findOne(query);
  if (!existedUser) {
    return res.status(404).json({
      success: false,
      message: "User does not exist!",
    });
  }

  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const { _id: id, name: name } = existedUser;
  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });


  res.status(200).json({
    success: true,
    result: {
      id,
      name,
      email: existedUser.email,
      phoneNumber: existedUser.phoneNumber,
      token,
    },
  });
};


export  const getUsers= async (req, res) => {
  try {
      const users = await User.find(); 
      res.json(users);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error, could not fetch users.' });
  }
}

export  const getUser = async (req, res) => {
  try {
  
    const user = await User.findById(req.params.id); 

    if (!user) {
      return res.status(404).json({message: "not found"});
    }
    res.json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error, could not fetch user.' });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully." }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user." }); 
  }
};




export const updateUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, country } = req.body;

   

    const emailLowerCase = email.toLowerCase();

  
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 12); 
    }

 
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      {
        name,
        email: emailLowerCase,
        password: hashedPassword || undefined, 
        phoneNumber,
        country,
      }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }


    return res.status(200).json({
      success: true,
      message: "User updated successfully!",
      user: {
        id: updatedUser._id,

        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        country: updatedUser.country,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

