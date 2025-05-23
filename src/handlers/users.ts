import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../utils/auth";

export const createUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  const isValid = await comparePasswords(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.json({ message: "Invalid credentials" });
  }

  const token = createJWT(user);
  res.json({ token });
};
