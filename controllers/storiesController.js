import Story from "../models/Story.js";
import User from "../models/User.js";

export default {
  createStory: async (req, res) => {
    try {
      await Story.create({
        title: req.body.title,
        body: req.body.story,
        status: req.body.status,
        user: req.user._id,
      });

      res.json({ status: "ok" });
    } catch (error) {
      console.error(error);
      res.json({ status: "error", error: "error creating story" });
    }
  },
  publicStories: async (req, res) => {
    try {
      const stories = await Story.find({ status: "public" })
        .populate("user")
        .sort({ createdAt: "desc" })
        .lean();

      if (req.user) {
        res.json({
          status: "ok",
          stories: stories,
          currentUser: req.user.email,
        });
      } else res.json({ status: "ok", stories: stories });
    } catch (error) {
      console.error(error);
      res.json({ status: "error", error: "can't GET public stories" });
    }
  },
  dashboardData: async (req, res) => {
    try {
      const user = req.user;
      const stories = await Story.find({ user: user._id })
        .sort({ createdAt: "desc" })
        .lean();

      res.json({ status: "ok", stories: stories, user: user });
    } catch (error) {
      console.error(error);
      res.json({ status: "error", error: "can't GET public stories" });
    }
  },
  deleteStory: async (req, res) => {
    try {
      await Story.deleteOne({ _id: req.params.id });

      res.json({ status: "ok" });
    } catch (error) {
      console.error(error);
      res.json({ status: "error", error: "can't delete story" });
    }
  },
  getStory: async (req, res) => {
    try {
      const story = await Story.findOne({ _id: req.params.id })
      .populate("user");

      res.json({ status: "ok", story: story });
    } catch (error) {
      console.error(error);
      res.json({ status: "error", error: "can't delete story" });
    }
  },
  editStory: async (req, res) => {
    try {
      await Story.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          body: req.body.story,
          status: req.body.status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      res.json({ status: "ok"});
    } catch (error) {
      console.error(error);
      res.json({ status: "error", error: "can't save story" });
    }
  },
  getUserPublicStories: async (req, res) => {
    try {
      const stories = await Story.find({ status: "public", user: req.params.userId })
        .populate("user")
        .sort({ createdAt: "desc" })
        .lean();

      const user = await User.findOne({_id: req.params.userId })

      res.json({ status: "ok", stories: stories, user: user });
    } catch (error) {
      console.error(error);
      res.json({ status: "error", error: "can't GET public stories" });
    }
  },
};
