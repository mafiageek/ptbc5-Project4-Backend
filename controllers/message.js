import Message from "../models/message.js";
import User from "../models/user.js";
import slugify from "slugify";
import { sendPushNotification } from "../helpers/pushNotifications.js";

export const create = async (req, res) => {
  try {
    const { fromuserid, touserid, content } = req.body;
    if (!content.trim()) {
      return res.json({ error: "Message is required" });
    }
    const message = await new Message({ ...req.body }).save();

    const user = await User.findById(touserid);

    sendPushNotification(user.pushtoken, content);

    res.json(message);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const list = async (req, res) => {
  const searchParams = req.query;
  try {
    const messages = await Message.find({ ...searchParams })
      .populate("fromuserid", "name email")
      .populate("touserid", "name email")
      .sort({
        createdAt: -1,
      });

    res.json(messages);
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    res.json(message);
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    res.json(message);
  } catch (err) {
    console.log(err);
  }
};
