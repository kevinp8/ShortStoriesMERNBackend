import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export default {
  register: async (req, res) => {
    try {
      const newPassword = await bcrypt.hash(req.body.password, 5);
      await User.create({
        displayName: req.body.name,
        email: req.body.email,
        password: newPassword,
      });
      res.json({ status: "ok" });
    } catch (error) {
      res.json({ status: "error", error: "Duplicate email" });
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });

      if (!user)
        res.json({
          status: "error",
          msg: "no account associated with this email",
        });

      const valid = await bcrypt.compare(req.body.password, user.password);

      if (valid) {
        const token = jwt.sign(
          {
            email: user.email,
            name: user.name,
          },
          process.env.SECRET
        );
        res.json({ status: "ok", user: token });
      } else res.json({ status: "error", msg: "wrong password" });
    } catch (error) {
      res.json({ status: "error", msg: "wrong password" });
    }
  },
};
