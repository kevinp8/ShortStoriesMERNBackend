import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export default async (req, res, next) => {
  const token = req.headers["x-access-token"];
  jwt.verify(token, process.env.SECRET, async (err, user) => {
    if (err) {
      return res.json({ status: "error", error: "invalid token" });
      console.log(err);
    }

    req.user = await User.findOne({
      email: user.email,
    })

    next();
  });
};
