import fs from "fs";
import slugify from "slugify";
import Listing from "../models/listing.js";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);

    const { title, price, category, location } = req.fields;
    const { photo } = req.files;

    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decoded;
    console.log(req.user._id);

    // validation
    switch (true) {
      case !title.trim():
        return res.json({ error: "title is required" });
      case !price.trim():
        return res.json({ error: "Price is required" });
      case !category.trim():
        return res.json({ error: "Category is required" });
    }

    const listing = new Listing({ ...req.fields, userid: req.user._id });

    if (photo) {
      listing.photo.data = fs.readFileSync(photo.path);
      listing.photo.contentType = photo.type;
    }

    await listing.save();
    res.json(listing);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const listings = await Listing.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .select("-photo")
      .populate("category");

    res.json(listing);
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    res.json(listing);
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);

    const { title, price, category, location } = req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !title.trim():
        return res.json({ error: "title is required" });
      case !price.trim():
        return res.json({ error: "Price is required" });
      case !category.trim():
        return res.json({ error: "Category is required" });
    }

    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
      },
      { new: true }
    );

    if (photo) {
      listing.photo.data = fs.readFileSync(photo.path);
      listing.photo.contentType = photo.type;
    }

    await listing.save();
    res.json(listing);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
