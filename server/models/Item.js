import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
    type: {
      type: String,
      enum: ["link", "note", "screenshot"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    source: {
      type: String,
      default: "Unknown source",
      trim: true,
    },

    url: {
      type: String,
      default: "",
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    userNote: {
      type: String,
      default: "",
      trim: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    isFavourite: {
      type: Boolean,
      default: false,
    },

    shareCode: {
      type: String,
      default: "",
      unique: true,
      sparse: true,
      index: true,
    },

    shareEnabled: {
      type: Boolean,
      default: false,
    },

    shareCreatedAt: {
      type: Date,
      default: null,
    },

    shareExpiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;