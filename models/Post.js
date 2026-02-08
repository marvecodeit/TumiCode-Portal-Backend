import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, ref:"User"
    },
    text: {
        type:String
    },
    image:{type:String,
        default:"",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    audio: {
      type: String,
      default: "",
    },
}, {timestamps: true})

postSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 48 } // 1 day
);

export default mongoose.model("Post", postSchema);