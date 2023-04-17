import fs from "fs";
import slugify from "slugify";
import Listing from "../models/listing.js";
import Category from "../models/category.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import jwt_decode from "jwt-decode";

export const create = async (req, res) => {
  console.log(req.fields);
  console.log(req.files);

  // Configure Multer to handle file uploads
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  const upload = multer({ storage: multer.memoryStorage() });

  const { title, price, category, photo } = req.fields;

  const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
  req.user = decoded;
  // console.log(req.user._id);

  const decodedInfo = jwt_decode(req.headers.authorization);
  console.log(decodedInfo._id);

  // validation
  switch (true) {
    case !title.trim():
      return res.json({ error: "title is required" });
    case !price.trim():
      return res.json({ error: "Price is required" });
    case !category.trim():
      return res.json({ error: "Category is required" });
  }

  try {
    // Use the Cloudinary SDK to upload the image
    const result = await cloudinary.uploader.upload(photo, {
      folder: "samples",
    });

    // Create a new listing in your database and include the uploaded image URL
    const listing = new Listing({
      ...req.fields,
      userid: req.user._id,
      photo: result.secure_url,
    });

    await listing.save();
    res.json(listing);
  } catch (err) {
    console.error(err);
  }
};

export const list = async (req, res) => {
  const searchParams = req.query;
  try {
    console.log("req params =>", req.params);
    const listings = await Listing.find({ ...searchParams })
      .populate("category")
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("category");

    res.json(listing);
  } catch (err) {
    console.log(err);
  }
};

// export const readbyuid = async (req, res) => {
//   const uid = req.params.uid;
//   try {
//     const listing = await Listing.find({ userid: uid }).populate("category");

//     res.json(listing);
//   } catch (err) {
//     console.log(err);
//   }
// };

export const remove = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    res.json(listing);
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res) => {
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

  try {
    // Use the Cloudinary SDK to upload the image
    if (photo) {
      const result = await cloudinary.uploader.upload(photo.path, {
        folder: "samples",
      });
    }
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
        photo: result.secure_url,
      },
      { new: true }
    );

    await listing.save();
    res.json(listing);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err.message);
  }
};
