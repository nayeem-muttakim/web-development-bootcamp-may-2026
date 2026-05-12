import { prisma } from "../config/db.js";
import bcrpyt from "bcryptjs";
import { tokenGenerator } from "../utils/tokenGenerator.js";

const register = async (req, res) => {
  const body = req.body;

  const { name, email, password } = body;

  //check for user
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res
      .status(400)
      .json({ error: "User already exist with this email" });
  }

  //secure password
  const salt = await bcrpyt.genSalt(10);
  const securedPass = await bcrpyt.hash(password, salt);

  //register user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: securedPass,
    },
  });

  //generate jwt
  const token = tokenGenerator(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: name,
        email: email,
      },
      token,
    },
  });
};

const login = async (req, res) => {
  const body = req.body;

  const { email, password } = body;

  //check for user
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid Email or Password" });
  }

  //validate password
  const isValidPass = await bcrpyt.compare(password, user.password);
  if (!isValidPass) {
    return res.status(401).json({ error: "Invalid Email or Password" });
  }

  //generate jwt
  const token = tokenGenerator(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: email,
      },
      token,
    },
  });
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(201).json({
    status: "success",
    message: "Log out successful",
  });
};

export { register, login, logout };
